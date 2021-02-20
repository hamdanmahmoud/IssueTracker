package com.issuetracker.accesscontrol.service;

import com.issuetracker.accesscontrol.dao.PermissionDao;
import com.issuetracker.accesscontrol.dao.RoleDao;
import com.issuetracker.accesscontrol.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoleService {
    private final RoleDao roleDao;
    private final PermissionDao permissionDao;

    @Autowired
    public RoleService(@Qualifier("postgres-role-repository") RoleDao roleDao,
                       @Qualifier("postgres-permission-repository") PermissionDao permissionDao) {
        this.roleDao = roleDao;
        this.permissionDao = permissionDao;
    }

    public Role createRole(Role role){
        return roleDao.insertRole(role);
    }

    public List<Role> getRolesByProjectId(UUID projectId){
        var roles = roleDao.selectRolesByProjectId(projectId);
        roles.forEach(
                role -> {
                    var permissions = permissionDao.selectPermissionsByRoleId(role.getId());
                    if (permissions.isPresent())
                        role.setPermissions(permissions.get());
                }
        );
        return roles;
    }

    public Optional<Role> getRoleById(UUID id){
        var role = roleDao.selectRoleById(id).orElse(null);
        if (role == null)
            return Optional.empty();

        var permissions = permissionDao.selectPermissionsByRoleId(id).orElse(Collections.emptyList());
        role.setPermissions(permissions);

        return Optional.ofNullable(role);
    }

    public Optional<Role> updateRoleById(UUID id, Role role) {
        var updatedRole = roleDao.updateRoleById(id, role).orElse(null);
        if (role == null)
            return Optional.empty();

        var permissions = permissionDao.selectPermissionsByRoleId(id).orElse(Collections.emptyList());
        updatedRole.setPermissions(permissions);
        return Optional.ofNullable(updatedRole);

    }

    public int deleteRole(UUID id){
        return roleDao.deleteRoleById(id);
    }
}
