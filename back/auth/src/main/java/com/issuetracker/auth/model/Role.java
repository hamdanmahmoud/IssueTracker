package com.issuetracker.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Collection;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Role implements GrantedAuthority, Serializable {
    private @NotBlank UUID id;
    private @NotBlank String authority;
    private @NotBlank UUID projectId;
    private @NotNull Collection<Permission> permissions;

    public Role(String authority, UUID projectId, Collection<Permission> permissions) {
        this.authority = authority;
        this.projectId = projectId;
        this.permissions = permissions;
    }

    public String getAuthority() {
        return authority;
    }
}
