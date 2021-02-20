package com.issuetracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "RoleOnUser")
@Table(name = "role_on_user")
public class RoleOnUserEntity implements Serializable {
    private @Id @NotNull UUID roleId;
    private @Id @NotNull UUID userOnProjectId;
}