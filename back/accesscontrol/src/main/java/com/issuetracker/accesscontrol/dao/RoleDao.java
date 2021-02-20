package com.issuetracker.accesscontrol.dao;

import com.issuetracker.accesscontrol.model.Role;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoleDao {
    Role insertRole(Role role);
    Optional<Role> selectRoleById(UUID id);
    List<Role> selectRolesByProjectId(UUID projectId);
    Optional<Role> updateRoleById(UUID id, Role role);
    int deleteRoleById(UUID id);
}
