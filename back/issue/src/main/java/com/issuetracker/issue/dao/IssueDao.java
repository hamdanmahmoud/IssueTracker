package com.issuetracker.issue.dao;

import com.issuetracker.issue.model.IssueEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IssueDao {
    IssueEntity insertIssue(IssueEntity issue);

    Optional<IssueEntity> selectIssueById(UUID id);

    List<IssueEntity> selectIssuesByUserId(UUID userId);

    List<IssueEntity> selectIssuesByProjectId(UUID userId);

    Optional<IssueEntity> updateIssueById(UUID id, IssueEntity issue);

    int deleteIssueById(UUID id);

    int deleteIssuesByProjectId(UUID projectId);

}