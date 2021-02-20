package com.issuetracker.accesscontrol.service;

import com.issuetracker.accesscontrol.dao.PermissionDao;
import com.issuetracker.accesscontrol.model.Permission;
import com.issuetracker.accesscontrol.model.Role;
import com.issuetracker.accesscontrol.model.RoleModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PermissionService {
    private final PermissionDao permissionDao;
    private static final List<Permission> allPermissions = new ArrayList<>() {{
        add(new Permission(null, "ADMINISTER_ROLES"));
        add(new Permission(null, "BE_ASSIGNABLE_TO_ISSUES"));
        add(new Permission(null, "ASSIGN_ISSUES"));
        add(new Permission(null, "CREATE_ISSUES"));
        add(new Permission(null, "CANCEL_ISSUES"));
        add(new Permission(null, "EDIT_ISSUES"));
        add(new Permission(null, "DELETE_ISSUES"));
        add(new Permission(null, "UPDATE_ISSUES_STATUS"));
        add(new Permission(null, "MARK_ISSUES_FOR_CLOSURE"));
        add(new Permission(null, "CLOSE_ISSUES"));
        add(new Permission(null, "VIEW_WATCHERS"));
        add(new Permission(null, "ADD_COMMENTS"));
        add(new Permission(null, "DELETE_ALL_COMMENTS"));
        add(new Permission(null, "DELETE_OWN_COMMENTS"));
        add(new Permission(null, "EDIT_ALL_COMMENTS"));
        add(new Permission(null, "EDIT_OWN_COMMENTS"));
    }};

    @Autowired
    public PermissionService(@Qualifier("postgres-permission-repository") PermissionDao permissionDao) {
        this.permissionDao = permissionDao;
    }

    public List<Permission> getAllPermissions(){
        return allPermissions;
    }

    public Optional<List<Permission>> getPermissionsByRoleId(UUID roleId){
        return permissionDao.selectPermissionsByRoleId(roleId);
    }

    public Permission createPermission(UUID roleId, String authority){
        return permissionDao.insertPermission(roleId, authority);
    }

    public void createPermissionsForRoleModel(UUID roleId, Collection<Permission> permissions) {
        // following 3 statements are bad practice, should be replaced with proper JOIN executions on db
        List<Permission> allDBPermissions = this.getAllPermissions();

        var permissionNames = permissions.stream()
                .map(Permission::getAuthority).collect(Collectors.toList());
        var permissionsToBeAssigned = allDBPermissions.stream()
                .filter(permission -> permissionNames.contains(permission.getAuthority())).collect(Collectors.toList());



        // normalization: linking Role entity to Permission entity using a weak entity
        permissionsToBeAssigned.stream()
                .map(permission -> createPermission(roleId, permission.getAuthority()))
                .collect(Collectors.toList());
    }

    public Optional<Permission> getPermissionByName(UUID roleId, String authority){
        return permissionDao.selectPermissionByName(roleId, authority);
    }

    public int deletePermission(UUID roleId, String authority){
        return permissionDao.deletePermission(roleId, authority);
    }

    public void updatePermissionsForRoleModel(UUID roleId, Role roleToUpdate) {
//        for (Permission permission : roleToUpdate.getPermissions()) {
//            this.createPermission(roleId, permission.getAuthority());
//        }

        // permissions

        var existingPermissions = this
                .getPermissionsByRoleId(roleId)
                .orElse(Collections.emptyList());

        var newPermissions = roleToUpdate.getPermissions()
                .stream()
                .filter(
                        permission -> !existingPermissions
                                .stream()
                                .anyMatch(existingPermission ->
                                        existingPermission.getAuthority()
                                                .equals(permission.getAuthority()))
                )
                .collect(Collectors.toList());


        if (existingPermissions != null) {
            List<Permission> permissionsToRemove = existingPermissions
                    .stream()
                    .filter(permission -> !roleToUpdate.getPermissions()
                            .stream()
                            .anyMatch(permissionToRemove ->
                                    permissionToRemove.getAuthority()
                                            .equals(permission.getAuthority())))
                    .collect(Collectors.toList());

            permissionsToRemove.forEach(
                    permission -> {
                        this.deletePermission(roleId, permission.getAuthority());
                    }
            );
        }

        List<Permission> permissionsToAdd = newPermissions
                .stream()
                .filter(element -> !existingPermissions.contains(element))
                .collect(Collectors.toList());

        permissionsToAdd.forEach(
                permission -> {
                    this.createPermission(roleId, permission.getAuthority());
                }
        );

    }
}
