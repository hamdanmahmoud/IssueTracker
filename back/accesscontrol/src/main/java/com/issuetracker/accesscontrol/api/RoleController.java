package com.issuetracker.accesscontrol.api;

import com.issuetracker.accesscontrol.model.*;
import com.issuetracker.accesscontrol.service.PermissionService;
import com.issuetracker.accesscontrol.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RequestMapping("/acl/api/roles")
@RestController
public class RoleController {

    private final RoleService roleService;
    private final PermissionService permissionService;
    private final RoleModelAssembler roleModelAssembler;

    @Autowired
    public RoleController(RoleService roleService,
                          PermissionService permissionService,
                          RoleModelAssembler roleModelAssembler) {
        this.roleService = roleService;
        this.permissionService = permissionService;
        this.roleModelAssembler = roleModelAssembler;
    }

    @PostMapping
    public ResponseEntity<RoleModel> addRole(@Valid @NonNull @RequestBody RoleModel roleModel){
        var roleModelName = roleModel.getAuthority();
        var roleModelProjectId = roleModel.getProjectId();
        Role roleEntity = roleService.createRole(new Role(roleModelName, roleModelProjectId));

        if (roleEntity == null) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        var roleId = roleEntity.getId();

        permissionService.createPermissionsForRoleModel(roleId, roleModel.getPermissions());

        return roleService.getRoleById(roleId)
                .map(roleModelAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<CollectionModel<RoleModel>> getAllRoles(@RequestParam(required = true) UUID projectId){
        var roleEntities = roleService.getRolesByProjectId(projectId);
        return new ResponseEntity<>(roleModelAssembler.toCollectionModel(roleEntities, projectId), HttpStatus.OK);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<RoleModel> getRoleById(@PathVariable("id") UUID id){
        return roleService.getRoleById(id)
                .map(roleModelAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<Object> deleteRoleById(@PathVariable("id") UUID id){
        if (roleService.getRoleById(id).isEmpty())
            return ResponseEntity.notFound().build();

        roleService.deleteRole(id);
        return null;
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<RoleModel> updateRoleById(@PathVariable("id") UUID id, @Valid @NonNull @RequestBody RoleModel roleToUpdate){
        if (roleService.getRoleById(id).isEmpty())
            return ResponseEntity.notFound().build();

        var newRoleName = roleToUpdate.getAuthority();
        var newRoleProjectId = roleToUpdate.getProjectId();

        var updatedRole = roleService.updateRoleById(id, new Role(id, newRoleName, newRoleProjectId)).orElse(null);
        updatedRole.setPermissions(roleToUpdate.getPermissions());
        permissionService.updatePermissionsForRoleModel(id, updatedRole);

        return roleService.getRoleById(id)
                .map(roleModelAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }
}
