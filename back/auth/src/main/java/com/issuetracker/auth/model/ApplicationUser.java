package com.issuetracker.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.common.collect.Sets;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.*;
import java.util.function.Function;

/**
 * This is the user class that also defines a builder
 */
@AllArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApplicationUser implements UserDetails, CredentialsContainer {
    private final @Id @GeneratedValue UUID id;
    private final String name;
    private String password;
    private final String username;
    private Set<? extends GrantedAuthority> authorities;
    private final boolean accountNonExpired;
    private final boolean accountNonLocked;
    private final boolean credentialsNonExpired;
    private final boolean enabled;

    @Override
    public void eraseCredentials() {
        this.password = null;
    }

    public UUID getId() { return id; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setAuthorities(Collection<Role> roles) {
        List<GrantedAuthority> authorities = fromStringsToRoles(roles);
        this.authorities = Sets.newHashSet(authorities);
    }

    private static List<GrantedAuthority> fromStringsToRoles(Collection<Role> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>(
                roles.size());

        for (Role role : roles) {
            Assert.isTrue(!role.getAuthority().startsWith("ROLE_"), () -> role.getAuthority()
                    + " cannot start with ROLE_ (it is automatically added)");

            authorities.add(new Role(role.getId(), "ROLE_" + role.getAuthority(), role.getProjectId(), role.getPermissions()));
        }

        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public static ApplicationUserBuilder withUsername(String username) {
        return builder().username(username);
    }

    public static ApplicationUserBuilder builder() {
        return new ApplicationUserBuilder();
    }

    public static ApplicationUser.ApplicationUserBuilder withUserDetails(UserDetails userDetails) {
        return withUsername(userDetails.getUsername())
                .password(userDetails.getPassword())
                .accountExpired(!userDetails.isAccountNonExpired())
                .accountLocked(!userDetails.isAccountNonLocked())
                .authorities(userDetails.getAuthorities())
                .credentialsExpired(!userDetails.isCredentialsNonExpired())
                .disabled(!userDetails.isEnabled());
    }

    /**
     * This is the user builder, its public methods usually return
     * "this", so that we can do method chaining when we actually
     * build a user
     */
    @NoArgsConstructor
    public static class ApplicationUserBuilder {
        private UUID id;
        private String name;
        private String username;
        private String password;
        private List<GrantedAuthority> authorities;
        private boolean accountExpired;
        private boolean accountLocked;
        private boolean credentialsExpired;
        private boolean disabled;
        private Function<String, String> passwordEncoder = password -> password;

        public ApplicationUser.ApplicationUserBuilder id(UUID id) {
            Assert.notNull(id, "id cannot be null");
            this.id = id;
            return this;
        }

        public ApplicationUser.ApplicationUserBuilder name(String name) {
            Assert.notNull(name, "name cannot be null");
            this.name = name;
            return this;
        }

        public ApplicationUser.ApplicationUserBuilder username(String username) {
            Assert.notNull(username, "username cannot be null");
            this.username = username;
            return this;
        }

        public ApplicationUser.ApplicationUserBuilder password(String password) {
            Assert.notNull(password, "password cannot be null");
            this.password = password;
            return this;
        }

        public ApplicationUser.ApplicationUserBuilder passwordEncoder(Function<String, String> encoder) {
            Assert.notNull(encoder, "encoder cannot be null");
            this.passwordEncoder = encoder;
            return this;
        }

        public ApplicationUser.ApplicationUserBuilder roles(Collection<Role> roles) {
            return authorities(fromStringsToRoles(roles));
        }


        public ApplicationUser.ApplicationUserBuilder authorities(Collection<? extends GrantedAuthority> authorities) {
            this.authorities = new ArrayList<>(authorities);
            return this;
        }

        public ApplicationUser.ApplicationUserBuilder accountExpired(boolean accountExpired) {
            this.accountExpired = accountExpired;
            return this;
        }

        public ApplicationUser.ApplicationUserBuilder accountLocked(boolean accountLocked) {
            this.accountLocked = accountLocked;
            return this;
        }

        public ApplicationUser.ApplicationUserBuilder credentialsExpired(boolean credentialsExpired) {
            this.credentialsExpired = credentialsExpired;
            return this;
        }

        public ApplicationUser.ApplicationUserBuilder disabled(boolean disabled) {
            this.disabled = disabled;
            return this;
        }

        public ApplicationUser build() {
            String encodedPassword = this.passwordEncoder.apply(password);
            return new ApplicationUser(
                    id,
                    name,
                    encodedPassword,
                    username,
                    Sets.newHashSet(authorities),
                    !accountExpired,
                    !accountLocked,
                    !credentialsExpired,
                    !disabled
            );
        }


    }
}
