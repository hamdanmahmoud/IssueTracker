package com.issuetracker.issue.service;

import com.issuetracker.issue.dao.IssueDao;
import com.issuetracker.issue.model.IssueEntity;
import com.issuetracker.issue.model.ProjectDetails;
import com.issuetracker.issue.model.UserAssignedOnIssueEntity;
import com.issuetracker.issue.model.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class IssueService {
    private final IssueDao issueDao;
    private final WebClient webClient;
    private final RestfulConfig restfulConfig;
    private final UserOnIssueService userOnIssueService;

    @Autowired
    public IssueService(@Qualifier("postgres-issue") IssueDao issueDao, WebClient webClient, RestfulConfig restfulConfig, UserOnIssueService userOnIssueService) {
        this.issueDao = issueDao;
        this.webClient = webClient;
        this.restfulConfig = restfulConfig;
        this.userOnIssueService = userOnIssueService;
    }

    public Optional<IssueEntity> addIssue(IssueEntity issue){
        var reporterId = issue.getReporter();
        var assignees = issue.getAssignees();
        var projectId = issue.getProject();
        try {
            var project = webClient
                    .get()
                    .uri(restfulConfig.getProjectMicroserviceEndpoint() + "/projects" + "/" + projectId)
                    .retrieve()
                    .bodyToMono(ProjectDetails.class)
                    .block();
            List<UUID> usersOnProject;
            if (project.getCollaborators() == null)
                usersOnProject = new ArrayList<>();
            else
                usersOnProject = project.getCollaborators();

            usersOnProject.add(project.getOwner());
            if (!usersOnProject.contains(reporterId)) { // issue reporter not in project
                return Optional.empty();
            }

            for (UUID assignee : assignees) { // one of the assignees not in project
                if (!usersOnProject.contains(assignee))
                    return Optional.empty();
            }

            var createdIssue = issueDao.insertIssue(issue);

            // TODO: not sure this is ok, investigate more
            // I did this because, when calling {{host}}/api/issues?projectId="xyz",
            // since reporter was not added in user_assigned_issue, I couldn't JOIN
            // issue with user_assigned_on_issue in IssueDao.selectIssuesByProjectId
            // and the return would have been empty
            userOnIssueService.assignUserToIssue(createdIssue.getId(), reporterId);

            if (createdIssue != null){
                assignees = assignees
                        .stream()
                        .map(
                                assignee -> userOnIssueService.assignUserToIssue(createdIssue.getId(), assignee)
                        )
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .map(UserAssignedOnIssueEntity::getUserId)
                        .collect(Collectors.toList());
                createdIssue.setAssignees(assignees);
            }
            return Optional.ofNullable(createdIssue);
        } catch (WebClientResponseException webClientResponseException) {
            return Optional.empty(); // some error encountered such as 404
        }

    }

    public Optional<IssueEntity> getIssueById(UUID id){
        var issue = issueDao.selectIssueById(id);
        var assignees = userOnIssueService.getAssigneesByIssueId(id);
        if (issue.isPresent())
            issue.get().setAssignees(assignees);
        return issue;
    }

    public List<IssueEntity> getIssuesByUserId(UUID userId) {
        var issues = issueDao.selectIssuesByUserId(userId);
        issues.forEach(
                issue -> issue.setAssignees(userOnIssueService.getAssigneesByIssueId(issue.getId()))
        );

        return issues;
    }

    public List<IssueEntity> getIssuesByProjectId(UUID userId) {
        var issues = issueDao.selectIssuesByProjectId(userId);
        System.out.println(issues.toString());
        issues.forEach(
                issue -> issue.setAssignees(userOnIssueService.getAssigneesByIssueId(issue.getId()))
        );

        return issues;
    }

    public Optional<IssueEntity> updateIssueById(UUID id, IssueEntity updatedIssue){
        // delete all assigned users
        userOnIssueService.removeUsersFromIssue(id);

        // assign updated users
        var assignees = updatedIssue.getAssignees();
        assignees.forEach(
                assignee -> userOnIssueService.assignUserToIssue(id, assignee)
        );

        updatedIssue.setId(id);
        return issueDao.updateIssueById(id, updatedIssue);
    }

    public int deleteIssueById(UUID id) {
        userOnIssueService.removeUsersFromIssue(id);
        return issueDao.deleteIssueById(id);
    }

    public int deleteIssuesByProjectId(UUID projectId) {
        return issueDao.deleteIssuesByProjectId(projectId);
    }

    // calls project to verify it actually exists
    public boolean isProjectIdValid(UUID projectId) {
        try {
            var project = webClient
                    .get()
                    .uri(restfulConfig.getProjectMicroserviceEndpoint() + "/projects" + "/" + projectId)
                    .retrieve()
                    .bodyToMono(ProjectDetails.class);
            if (project.block() == null)
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

    // calls user to verify it actually exists
    public boolean isUserIdValid(UUID userId) {
        try {
            var user = webClient
                    .get()
                    .uri(restfulConfig.getUserMicroserviceEndpoint() + "/users" + "/" + userId)
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
}
