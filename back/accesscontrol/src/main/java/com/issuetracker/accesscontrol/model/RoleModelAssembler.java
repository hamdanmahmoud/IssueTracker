package com.issuetracker.accesscontrol.model;

import com.issuetracker.accesscontrol.api.RoleController;
import com.issuetracker.accesscontrol.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

/**
 * This class assembles a RoleModel from a Role entity,
 * such that if we want to change the external representation of
 * the Role resource, we can do so without affecting the internal
 * representation of our Role entity and viceversa.
 */
@Component
public class RoleModelAssembler extends RepresentationModelAssemblerSupport<Role, RoleModel> {

    @Autowired
    private PermissionService permissionService;

    public RoleModelAssembler() {
        super(RoleController.class, RoleModel.class);
    }

    @Override
    public RoleModel toModel(Role entity) {
        RoleModel roleModel = instantiateModel(entity);

        roleModel.setId(entity.getId());
        roleModel.setAuthority(entity.getAuthority());
        roleModel.setProjectId(entity.getProjectId());
        roleModel.setPermissions(entity.getPermissions());
        roleModel.add(linkTo(methodOn(RoleController.class).getRoleById(entity.getId()))
                .withSelfRel()
        );
        roleModel.add(linkTo(methodOn(RoleController.class).getAllRoles(roleModel.getProjectId()))
                .withRel("roles")
        );
        return roleModel;
    }

    public CollectionModel<RoleModel> toCollectionModel(Iterable<? extends Role> entities, UUID projectId) {
        CollectionModel<RoleModel> roleModels = super.toCollectionModel(entities);
        roleModels.add(linkTo(methodOn(RoleController.class).getAllRoles(projectId)).withSelfRel());
        return roleModels;
    }

}