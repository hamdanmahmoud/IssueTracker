package com.issuetracker.issue.service;

import com.issuetracker.issue.dao.UserOnIssueDao;
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


@Service
public class UserOnIssueService {

    private final UserOnIssueDao userOnIssueDao;
    private final WebClient webClient;
    private final RestfulConfig restfulConfig;

    @Autowired
    public UserOnIssueService(@Qualifier("postgres-useronissue") UserOnIssueDao userOnIssueDao, WebClient webClient, RestfulConfig restfulConfig) {
        this.userOnIssueDao = userOnIssueDao;
        this.webClient = webClient;
        this.restfulConfig = restfulConfig;
    }

    public Optional<UserAssignedOnIssueEntity> assignUserToIssue (UUID issueId, UUID userId){
        return Optional.ofNullable(userOnIssueDao.assignUserToIssue(issueId, userId));
    }

    // calls user to verify user exists
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
                return false;
            }
        }
        return false;
    }

    public int removeUserFromIssue(UUID issueId, UUID userId) {
        return userOnIssueDao.removeUserFromIssue(issueId, userId);
    }

    public int removeUsersFromIssue(UUID issueId) {
        return userOnIssueDao.removeUsersFromIssue(issueId);
    }


    public List<UUID> getAssigneesByIssueId(UUID issueId) {
        return userOnIssueDao.getAssigneesByIssueId(issueId);
    }
}
