package com.issuetracker.auth.auth;

import com.issuetracker.auth.dao.ApplicationUserDao;
import com.issuetracker.auth.model.ApplicationUser;
import com.issuetracker.auth.model.RoleIdsOnUserModel;
import com.issuetracker.auth.model.Role;
import com.issuetracker.auth.rest.RestfulConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthService implements UserDetailsService {
    private final ApplicationUserDao applicationUserDao;
    private final WebClient webClient;
    private final RestfulConfig restfulConfig;
    private ApplicationUser authenticatedUser;

    @Autowired
    public AuthService(@Qualifier("postgres-user") ApplicationUserDao applicationUserDao,
                       WebClient webClient,
                       RestfulConfig restfulConfig) {
        this.applicationUserDao = applicationUserDao;
        this.webClient = webClient;
        this.restfulConfig = restfulConfig;
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        var user = applicationUserDao.selectApplicationUserByMail(mail)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username with mail %s not found", mail)));
        this.authenticatedUser = user;

        if (SecurityContextHolder.getContext().getAuthentication() != null)
            user.setAuthorities(loadRolesByUserId(user.getId()));
        return user;
    }

    public Set<Role> loadRolesByUserId(UUID userId) {
        // call loadRoleIdsByUserId
        var roleIds = loadRoleIdsByUserId(userId);

        // for each roleId, call loadRoleById (map or something)
        return roleIds.stream()
                .map(this::loadRoleById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
    }

    // calls project microservice to retrieve role ids for a user id
    public List<UUID> loadRoleIdsByUserId(UUID userId) {

        // call microservice

        try {
            var user = webClient
                    .get()
                    .uri(restfulConfig.getProjectMicroserviceEndpoint() + "/users" + "/" + userId + "/roles")
                    .retrieve()
                    .bodyToMono(RoleIdsOnUserModel.class);
            return user.block().getRoleIds();
        }
        catch (WebClientResponseException webClientResponseException) {
            if(HttpStatus.NOT_FOUND.equals(webClientResponseException.getStatusCode())) {
                return Collections.emptyList();
            }
            return Collections.emptyList();

        }

    }

    // calls accesscontrol microservice to retrieve a role by id
    public Optional<Role> loadRoleById(UUID roleId) {

        // call microservice
        try {
            var role = webClient
                    .get()
                    .uri(restfulConfig.getAccesscontrolMicroserviceEndpoint() + "/roles" + "/" + roleId)
                    .retrieve()
                    .bodyToMono(Role.class)
                    .block();
            return Optional.ofNullable(role);
        }
        catch (WebClientResponseException webClientResponseException) {
            if(HttpStatus.NOT_FOUND.equals(webClientResponseException.getStatusCode())) {
                return Optional.empty();
            }
        }

        return Optional.empty();

    }

    public ApplicationUser getAuthenticatedUser() {
        return this.authenticatedUser;
    }
}
