package com.issuetracker.accesscontrol.dao;

import com.issuetracker.accesscontrol.model.Permission;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PermissionDao {
    Permission insertPermission(UUID roleId, String authority);
    Optional<List<Permission>> selectPermissionsByRoleId(UUID roleId);
    Optional<Permission> selectPermissionByName(UUID roleId, String name);
    int deletePermission(UUID roleId, String name);
}
