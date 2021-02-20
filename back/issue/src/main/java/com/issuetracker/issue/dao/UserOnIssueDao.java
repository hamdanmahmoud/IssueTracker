package com.issuetracker.issue.dao;


import com.issuetracker.issue.model.UserAssignedOnIssueEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface UserOnIssueDao {
    UserAssignedOnIssueEntity assignUserToIssue (UUID issueId, UUID userId);

    int removeUserFromIssue (UUID issueId, UUID userId);

    List<UUID> getAssigneesByIssueId(UUID issueId);

    int removeUsersFromIssue(UUID issueId);
}
