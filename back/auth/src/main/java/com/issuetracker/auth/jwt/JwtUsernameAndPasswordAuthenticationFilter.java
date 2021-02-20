package com.issuetracker.auth.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.issuetracker.auth.auth.AuthService;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Collection;

public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final SecretKey secretKey;
    private final JwtConfig jwtConfig;

    @Autowired
    public JwtUsernameAndPasswordAuthenticationFilter(AuthenticationManager authenticationManager,
                                                      AuthService authService, SecretKey secretKey,
                                                      JwtConfig jwtConfig) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
        this.secretKey = secretKey;
        this.jwtConfig = jwtConfig;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        try {
            AuthenticationRequestBody authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), AuthenticationRequestBody.class);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()
            );

            Authentication authenticate = authenticationManager.authenticate(authentication);

            return authenticate;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        String tokenWithNoAuthorities = generateToken(authResult);

        // saving authentication to context for propagation
        // when calling other microservices to get permissions
        saveAuthenticationToSecurityContext(authResult.getName(), tokenWithNoAuthorities, authResult.getAuthorities());

        // will call microservices to get authorities of this user
        var obtainedAuthorities = authService
                .loadUserByUsername(authResult.getName()).getAuthorities();

        // regenerate token, this time with obtained authorities,
        // credentials in UsernamePasswordAuthenticationToken is
        // the password sent by user in initial (login) request
        Authentication fullyDetailedAuthentication =
                saveAuthenticationToSecurityContext(authResult.getName(), authResult.getCredentials(), obtainedAuthorities);
        String tokenWithAuthorities = generateToken(fullyDetailedAuthentication);

        System.out.println(tokenWithAuthorities);

        // add final full token to authorization header to send it back to the user
        response.addHeader(jwtConfig.getAuthorizationHeader(), jwtConfig.getTokenPrefix() + tokenWithAuthorities);
        response.addHeader(jwtConfig.getExposeHeadersHeader(), "Authorization");
        response.setStatus(204);
    }

    public String generateToken(Authentication authentication) {
        var authenticatedUser = this.authService.getAuthenticatedUser();
        return Jwts.builder()
                .setSubject(authenticatedUser.getUsername())
                .claim("authorities", authentication.getAuthorities())
                .claim("id", authenticatedUser.getId())
                .claim("name", authenticatedUser.getName())
                .setIssuedAt(Date.valueOf(LocalDate.now()))
                .setExpiration(Date.valueOf(LocalDate.now().plusMonths(3)))
                .signWith(secretKey)
                .compact();
    }

    public Authentication saveAuthenticationToSecurityContext(Object principal,
                                            Object credentials,
                                            Collection<? extends GrantedAuthority> authorities) {

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                principal, credentials, authorities
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authentication;
    }
}
