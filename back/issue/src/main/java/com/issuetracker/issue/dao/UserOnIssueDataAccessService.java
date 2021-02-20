package com.issuetracker.issue.dao;

import com.issuetracker.issue.model.UserAssignedOnIssueEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Types;
import java.util.List;
import java.util.UUID;

@Repository("postgres-useronissue")
public class UserOnIssueDataAccessService implements UserOnIssueDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserOnIssueDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public UserAssignedOnIssueEntity assignUserToIssue(UUID issueId, UUID userId) {
        final String statement = "INSERT INTO user_assigned_on_issue(issue_id, user_id) " +
                "VALUES (?, ?)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

        try {
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(statement, PreparedStatement.RETURN_GENERATED_KEYS);
                ps.setObject(1, issueId.toString(), Types.OTHER);
                ps.setObject(2, userId.toString(), Types.OTHER);
                return ps;
            }, keyHolder);
            return new UserAssignedOnIssueEntity(userId, issueId);
        } catch (Exception exception) {
            return null;
        }

    }

    @Override
    public int removeUserFromIssue(UUID issueId, UUID userId) {
        final String statement = "DELETE FROM user_assigned_on_issue " +
                "WHERE issue_id = ? AND user_id = ?";
        Object[] args = new Object[] {issueId, userId};
        return jdbcTemplate.update(statement, args);
    }

    @Override
    public List<UUID> getAssigneesByIssueId(UUID issueId) {
        final String statement = "SELECT user_id FROM user_assigned_on_issue WHERE issue_id = ?";
        Object[] args = new Object[] {issueId};
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID userId = UUID.fromString(resultSet.getString("user_id"));
                    return userId;
                });

        return queryResult;
    }

    @Override
    public int removeUsersFromIssue(UUID issueId) {
        final String statement = "DELETE FROM user_assigned_on_issue " +
                "WHERE issue_id = ?";
        Object[] args = new Object[] {issueId};
        return jdbcTemplate.update(statement, args);
    }
}
