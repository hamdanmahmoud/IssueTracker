package com.issuetracker.project.api;

import com.issuetracker.project.model.*;
import com.issuetracker.project.service.ProjectService;
import com.issuetracker.project.service.UserOnProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("project/api/users")
public class UserController {

    private final ProjectService projectService;
    private final ProjectModelAssembler projectModelAssembler;
    private final UserOnProjectService userOnProjectService;
    private final RoleOnUserModelAssembler roleOnUserModelAssembler;

    @Autowired
    public UserController(ProjectService projectService,
                             ProjectModelAssembler projectModelAssembler,
                             UserOnProjectService userOnProjectService,
                             RoleOnUserModelAssembler roleOnUserModelAssembler) {
        this.projectModelAssembler = projectModelAssembler;
        this.projectService = projectService;
        this.userOnProjectService = userOnProjectService;
        this.roleOnUserModelAssembler = roleOnUserModelAssembler;
    }

    @GetMapping(path = "{userId}/roles")
    public RepresentationModel<RoleIdsOnUserModel> getRolesByUserId(@PathVariable("userId") UUID userId,
                                                                    @RequestParam(name = "projectId", required = false) UUID projectId){
        return new RoleIdsOnUserModel(userId, userOnProjectService.getRoleIdsByUserId(userId, projectId));
    }

    @PutMapping(path = "{userId}/roles")
    public void updateUserRolesByProjectId(@PathVariable("userId") UUID userId,
                                           @RequestParam(name = "projectId") UUID projectId,
                                           @RequestBody ArrayList<RoleDetailsWithPermissions> roles){
        System.out.println(roles);
        userOnProjectService.updateUserRolesByProjectId(projectId, userId, roles);
    }

}