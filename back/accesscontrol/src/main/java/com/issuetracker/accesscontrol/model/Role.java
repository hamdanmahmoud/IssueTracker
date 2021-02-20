package com.issuetracker.accesscontrol.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "role")
@NoArgsConstructor
@AllArgsConstructor
public class Role implements GrantedAuthority {
    private @Id @GeneratedValue UUID id;
    private String authority;
    private UUID projectId;

    @OneToMany
    private Collection<Permission> permissions;

    public Role(String authority, UUID projectId) {
        this.authority = authority;
        this.projectId = projectId;
        this.permissions = Collections.emptyList();
    }

    public Role(UUID id, String authority, UUID projectId) {
        this.id = id;
        this.authority = authority;
        this.projectId = projectId;
        this.permissions = Collections.emptyList();
    }

    public Role(String authority, UUID projectId, Collection<Permission> permissions) {
        this.authority = authority;
        this.projectId = projectId;
        this.permissions = permissions;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public void setPermissions(Collection<Permission> permissions) {
        this.permissions = permissions;
    }

    public void setPermissions(List<String> permissions) {
        this.permissions = permissions
                .stream()
                .map(permission -> new Permission(id, permission))
                .collect(Collectors.toList());
    }
}
