package com.issuetracker.accesscontrol.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Data
@Entity
@Table(name = "permission")
@NoArgsConstructor
@AllArgsConstructor
public class Permission implements GrantedAuthority {
    @Id @Column(name="role_id")
    private UUID roleId;
    private String authority;

    public Permission(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return authority;
    }
}
