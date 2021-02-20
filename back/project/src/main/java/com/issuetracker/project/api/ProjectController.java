package com.issuetracker.project.api;

import com.issuetracker.project.model.*;
import com.issuetracker.project.service.ProjectService;
import com.issuetracker.project.service.UserOnProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("project/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectModelAssembler projectModelAssembler;
    private final UserOnProjectService userOnProjectService;
    private final RoleOnUserModelAssembler roleOnUserModelAssembler;

    @Autowired
    public ProjectController(ProjectService projectService,
                             ProjectModelAssembler projectModelAssembler,
                             UserOnProjectService userOnProjectService,
                             RoleOnUserModelAssembler roleOnUserModelAssembler) {
        this.projectModelAssembler = projectModelAssembler;
        this.projectService = projectService;
        this.userOnProjectService = userOnProjectService;
        this.roleOnUserModelAssembler = roleOnUserModelAssembler;
    }

    @GetMapping
    public ResponseEntity<CollectionModel<ProjectModel>> getProjectsByUserId(@RequestParam("userId") UUID userId){
        var projectEntities = projectService.getProjectsByUserId(userId);
        System.out.println(projectEntities);
        return new ResponseEntity<>(projectModelAssembler.toCollectionModel(projectEntities), HttpStatus.OK);
    }

    @GetMapping(path = "{projectId}")
    public ResponseEntity<ProjectModel> getProjectById(@PathVariable("projectId") UUID projectId){
        return projectService.getProjectById(projectId)
                .map(projectModelAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(path = "{projectId}/userIds")
    public List<UUID> getUsersByProjectId(@PathVariable("projectId") UUID projectId){
        return userOnProjectService.getUserIdsByProjectId(projectId);
    }

    @PostMapping
    public ResponseEntity<ProjectModel> addProject(@Valid @NonNull @RequestBody ProjectModel projectModel) {
        var title = projectModel.getTitle();
        var ownerId = projectModel.getOwner();
        var userIds = projectModel.getCollaborators();
        var summary = projectModel.getSummary();
        var created = projectModel.getCreated();

        // call user microservice
        if (!projectService.isOwnerIdValid(ownerId))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        ProjectEntity projectEntity = projectService.addProject(new ProjectEntity(title, ownerId, summary, created, userIds));

        return Optional.ofNullable(projectEntity)
                .map(projectModelAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(path = "{projectId}/user/{userId}/assignRole/{roleId}")
    public Optional<RoleOnUserModel> assignUserRoleOnProject(@PathVariable("projectId") UUID projectId,
                                                              @PathVariable("userId") UUID userId,
                                                              @PathVariable("roleId") UUID roleId){

        return userOnProjectService.assignRoleToUser(projectId, userId, roleId)
                .map(roleOnUserModelAssembler::toModel);
    }

    @DeleteMapping(path = "{projectId}/user/{userId}/removeRole/{roleId}")
    public void removeUserRoleOnProject(@PathVariable("projectId") UUID projectId,
                                                             @PathVariable("userId") UUID userId,
                                                             @PathVariable("roleId") UUID roleId){
        userOnProjectService.removeRoleFromUser(projectId, userId, roleId);
    }


    @DeleteMapping(path = "{projectId}")
    public void deleteProjectById(@PathVariable("projectId") UUID projectId){
        projectService.deleteProjectById(projectId);
    }

    @PutMapping(path = "{projectId}")
    public ResponseEntity<ProjectModel> updateProjectById(@PathVariable("projectId") UUID projectId,
                                                          @Valid @RequestBody ProjectModel projectModel){
        var projectTitle = projectModel.getTitle();
        var ownerId = projectModel.getOwner();
        var summary = projectModel.getSummary();
        var created = projectModel.getCreated();
        var userIds =  projectModel.getCollaborators();

        var projectEntity = projectService.updateProjectById(
                projectId,
                new ProjectEntity(projectTitle, ownerId, summary, created, userIds)
        );

        var existingUserIds = userOnProjectService.getUserIdsByProjectId(projectId);
        var newUserIds = userIds.stream()
                .filter(userId -> !existingUserIds.contains(userId))
                .collect(Collectors.toList());
        var userIdsToBeRemoved = existingUserIds.stream()
                .filter(userId -> !userIds.contains(userId) && !userId.equals(ownerId))
                .collect(Collectors.toList());

        newUserIds.forEach(userId -> userOnProjectService.addUserOnProject(
                new UserOnProjectEntity(userId, projectId)
        ));

        userIdsToBeRemoved.forEach(userId ->
                userOnProjectService.removeUserFromProject(projectId, userId)
        );

        return projectEntity
                .map(projectModelAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
