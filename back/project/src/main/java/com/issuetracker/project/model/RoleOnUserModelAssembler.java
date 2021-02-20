package com.issuetracker.project.model;

import com.issuetracker.project.api.ProjectController;
import com.issuetracker.project.service.UserOnProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

@Component
public class RoleOnUserModelAssembler extends RepresentationModelAssemblerSupport<RoleOnUserEntity, RoleOnUserModel> {

    @Autowired
    private UserOnProjectService userOnProjectService;

    public RoleOnUserModelAssembler() {
        super(ProjectController.class, RoleOnUserModel.class);
    }

    @Override
    public RoleOnUserModel toModel(RoleOnUserEntity entity) {
        RoleOnUserModel roleOnUserModel = instantiateModel(entity);
        roleOnUserModel.setRoleId(entity.getRoleId());
        roleOnUserModel.setUserId(userOnProjectService.getUserIdFromUserOnProjectId(entity.getUserOnProjectId()));

        return roleOnUserModel;
    }

}
