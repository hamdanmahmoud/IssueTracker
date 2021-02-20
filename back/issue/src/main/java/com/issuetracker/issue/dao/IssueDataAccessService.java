package com.issuetracker.issue.dao;

import com.issuetracker.issue.model.IssueEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Types;
import java.util.*;

@Repository("postgres-issue")
public class IssueDataAccessService implements IssueDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public IssueDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public IssueEntity insertIssue(IssueEntity issue) {
        System.out.println("Description " + issue.getDescription());
        final String statement = "INSERT INTO issue(" +
                "name, project_id, reporter, description, status, type, priority, summary, created) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(statement, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, issue.getName());
            ps.setObject(2, issue.getProject().toString(), Types.OTHER);
            ps.setObject(3, issue.getReporter().toString(), Types.OTHER);
            ps.setString(4, issue.getDescription());
            ps.setString(5, issue.getStatus());
            ps.setString(6, issue.getType());
            ps.setInt(7, issue.getPriority());
            ps.setString(8, issue.getSummary());
            ps.setDate(9, issue.getCreated());
            return ps;
        }, keyHolder);

        var uid = (UUID) Objects.requireNonNull(Objects.requireNonNull(keyHolder.getKeys()).get("id"));
        var name = (String) Objects.requireNonNull(keyHolder.getKeys().get("name"));
        var reporterId = (UUID) Objects.requireNonNull(keyHolder.getKeys().get("reporter"));
        var projectId = (UUID) Objects.requireNonNull(keyHolder.getKeys().get("project_id"));
        var description = (String) Objects.requireNonNull(keyHolder.getKeys().get("description"));
        var status = (String) Objects.requireNonNull(keyHolder.getKeys().get("status"));
        var type = (String) Objects.requireNonNull(keyHolder.getKeys().get("type"));
        var priority = (Integer) Objects.requireNonNull(keyHolder.getKeys().get("priority"));
        var summary = (String) Objects.requireNonNull(keyHolder.getKeys().get("summary"));
        var created = (Date) Objects.requireNonNull(keyHolder.getKeys().get("created"));
        return new IssueEntity(
                uid,
                name,
                projectId,
                reporterId,
                description,
                status,
                type,
                priority,
                summary,
                created,
                null
        );
    }

    @Override
    public Optional<IssueEntity> selectIssueById(UUID id) {
        final String statement = "SELECT * FROM issue WHERE id = ?";
        Object[] args = new Object[] {id};
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID projectId = UUID.fromString(resultSet.getString("project_id"));
                    UUID reporterId = UUID.fromString(resultSet.getString("reporter"));
                    String name = resultSet.getString("name");
                    String description = resultSet.getString("description");
                    String status = resultSet.getString("status");
                    String type = resultSet.getString("type");
                    Integer priority = resultSet.getInt("priority");
                    String summary = resultSet.getString("summary");
                    Date created = resultSet.getDate("created");
                    return new IssueEntity(
                            id,
                            name,
                            projectId,
                            reporterId,
                            description,
                            status,
                            type,
                            priority,
                            summary,
                            created,
                            null
                    );
                });

        if (queryResult.size() != 1)
            return Optional.empty();

        return Optional.ofNullable(queryResult.get(0));
    }

    @Override
    public List<IssueEntity> selectIssuesByUserId(UUID userId) {
        final String statement = "SELECT * " +
                "FROM issue " +
                "JOIN user_assigned_on_issue " +
                "ON issue.id = user_assigned_on_issue.issue_id " +
                "WHERE user_id = ?";

        Object[] args = new Object[]{userId};
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID issueId = UUID.fromString(resultSet.getString("id"));
                    UUID projectId = UUID.fromString(resultSet.getString("project_id"));
                    UUID reporterId = UUID.fromString(resultSet.getString("reporter"));
                    String issueName = resultSet.getString("name");
                    String description = resultSet.getString("description");
                    String type = resultSet.getString("type");
                    String status = resultSet.getString("status");
                    Integer priority = resultSet.getInt("priority");
                    String summary = resultSet.getString("summary");
                    Date created = resultSet.getDate("created");
                    return new IssueEntity(
                            issueId,
                            issueName,
                            projectId,
                            reporterId,
                            description,
                            status,
                            type,
                            priority,
                            summary,
                            created,
                            null
                    );
                });

        if (queryResult.size() == 0)
            return Collections.emptyList();

        return queryResult;

    }

    @Override
    public List<IssueEntity> selectIssuesByProjectId(UUID projectId) {
        final String statement = "SELECT * " +
                "FROM issue " +
                "WHERE project_id = ?";

        Object[] args = new Object[]{projectId};
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID issueId = UUID.fromString(resultSet.getString("id"));
                    UUID reporterId = UUID.fromString(resultSet.getString("reporter"));
                    String issueName = resultSet.getString("name");
                    String description = resultSet.getString("description");
                    String type = resultSet.getString("type");
                    String status = resultSet.getString("status");
                    Integer priority = resultSet.getInt("priority");
                    String summary = resultSet.getString("summary");
                    Date created = resultSet.getDate("created");
                    return new IssueEntity(
                            issueId,
                            issueName,
                            projectId,
                            reporterId,
                            description,
                            status,
                            type,
                            priority,
                            summary,
                            created,
                            null
                    );
                });
        System.out.println("Query result:" + queryResult);
        if (queryResult.size() == 0)
            return Collections.emptyList();

        return queryResult;
    }

    // project and reporter are not updatable
    @Override
    public Optional<IssueEntity> updateIssueById(UUID id, IssueEntity issue) {
        final String sql = "UPDATE issue SET " +
                "name = ?, " +
                "description = ?, " +
                "status = ?, " +
                "type = ?, " +
                "priority = ?, " +
                "summary = ? " +
                "WHERE id = ?";
        Object[] args = new Object[] {
                issue.getName(),
                issue.getDescription(),
                issue.getStatus(),
                issue.getType(),
                issue.getPriority(),
                issue.getSummary(),
                id
        };
        var updateResult = jdbcTemplate.update(sql, args);

        // should raise exception
        if (updateResult != 1) {
            return Optional.empty();
        }
        return Optional.of(issue);
    }

    @Override
    public int deleteIssueById(UUID id) {
        final String statement = "DELETE FROM issue WHERE id = ?";
        Object[] args = new Object[] {id};
        return jdbcTemplate.update(statement, args);
    }

    @Override
    public int deleteIssuesByProjectId(UUID projectId) {

        final String statement = "DELETE " +
                "FROM issue " +
                "WHERE project_id = ?";
        Object[] args = new Object[] {projectId};
        return jdbcTemplate.update(statement, args);
    }
}
