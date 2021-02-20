package com.issuetracker.project.service;

import com.issuetracker.project.dao.ProjectDao;
import com.issuetracker.project.model.ProjectEntity;
import com.issuetracker.project.model.RoleDetails;
import com.issuetracker.project.model.UserDetails;
import com.issuetracker.project.model.UserOnProjectEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.*;

@Service
public class ProjectService {

    private final ProjectDao projectDao;
    private final WebClient webClient;
    private final RestfulConfig restfulConfig;
    private final UserOnProjectService userOnProjectService;

    @Autowired
    public ProjectService(@Qualifier("postgres-project") ProjectDao projectDao,
                          WebClient webClient,
                          RestfulConfig restfulConfig, UserOnProjectService userOnProjectService) {
        this.projectDao = projectDao;
        this.webClient = webClient;
        this.restfulConfig = restfulConfig;
        this.userOnProjectService = userOnProjectService;
    }

    public ProjectEntity addProject(ProjectEntity project){
        var usersOnProject = project.getCollaborators();
        var owner = project.getOwner();
        usersOnProject.add(owner); // adding owner to list of users as well (redundant, I know)
        project.setCollaborators(usersOnProject);

        var createdProject = projectDao.insertProject(project);
        createdProject.setCollaborators(project.getCollaborators());

        // call accesscontrol microservice
        var projectEntityId = createdProject.getId();
        var ownerRoleId = this.createOwnerRole(projectEntityId);

        // for the rest of users initially assigned on project, no roles are defined
        // they are only added to the user_on_project table to link them to their project
        createdProject.getCollaborators().forEach(
                userId -> {
                    var userOnProject = new UserOnProjectEntity(null, userId, projectEntityId);
                    userOnProjectService.addUserOnProject(userOnProject);
                }
        );

        // add entry in role_on_user with role_id = ownerRoleId, retrieved from accesscontrol
        // and user_on_project_id = projectOwnerId, that references user_id in table user_on_project
        // in this microservice
        userOnProjectService.assignRoleToUser(projectEntityId, owner, ownerRoleId);

        return createdProject;
    }

    public List<ProjectEntity> getProjectsByUserId(UUID userId) { return projectDao.selectProjectsByUserId(userId);}

    public Optional<ProjectEntity> getProjectById(UUID id){
        return projectDao.selectProjectById(id);
    }

    public Optional<ProjectEntity> updateProjectById(UUID id, ProjectEntity updatedProject){
        return projectDao.updateProjectById(id, updatedProject);
    }

    public int deleteProjectById(UUID id) {
        try {
            var req = webClient
                    .delete()
                    .uri(restfulConfig.getIssueMicroserviceEndpoint() + "/issues" + "?projectId=" + id)
                    .retrieve()
                    .bodyToMono(Void.class);
            req.block();

        }
        catch (WebClientResponseException webClientResponseException) {
            return 0;
        }

        return projectDao.deleteProjectById(id);
    }

    // calls user to verify owner user exists
    public boolean isOwnerIdValid(UUID ownerId) {
        try {
            var user = webClient
                    .get()
                    .uri(restfulConfig.getUserMicroserviceEndpoint() + "/users" + "/" + ownerId)
                    .retrieve()
                    .bodyToMono(UserDetails.class);
            if (user.block() == null)
                return false;
            return true;
        }
        catch (WebClientResponseException webClientResponseException) {
            if(HttpStatus.NOT_FOUND.equals(webClientResponseException.getStatusCode())) {
                // your handling of "NOT FOUND" here
                // e.g. throw new RuntimeException("Your Error Message here", httpClientOrServerExc);
                return false;
            }
        }
        return false;
    }

    // calls accesscontrol to define OWNER role on this very project
    public UUID createOwnerRole(UUID projectId) {
        try {
            RoleDetails role = new RoleDetails(
                    "Owner",
                    projectId,
                    Arrays.asList(
                            "ADMINISTER_ROLES",
                            "BE_ASSIGNABLE_TO_ISSUES",
                            "ASSIGN_ISSUES",
                            "CREATE_ISSUES",
                            "CANCEL_ISSUES",
                            "EDIT_ISSUES",
                            "DELETE_ISSUES",
                            "UPDATE_ISSUES_STATUS",
                            "MARK_ISSUES_FOR_CLOSURE",
                            "CLOSE_ISSUES",
                            "VIEW_WATCHERS",
                            "MANAGE_WATCHERS",
                            "ADD_COMMENTS",
                            "DELETE_ALL_COMMENTS",
                            "DELETE_OWN_COMMENTS",
                            "EDIT_ALL_COMMENTS",
                            "EDIT_OWN_COMMENTS"
                    )
            );
            var roleMono = webClient
                    .post()
                    .uri(restfulConfig.getAccesscontrolMicroserviceEndpoint() + "/roles?projectId=" + projectId)
                    .body(Mono.just(role), RoleDetails.class)
                    .retrieve()
                    .bodyToMono(RoleDetails.class);
            var roleId = roleMono.block().getId();
            return roleId;
        }
        catch (WebClientResponseException webClientResponseException) {
            return null;
        }

    }


}
