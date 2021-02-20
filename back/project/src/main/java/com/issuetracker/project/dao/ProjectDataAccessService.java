package com.issuetracker.project.dao;

import com.issuetracker.project.model.ProjectEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Types;
import java.util.*;

@Repository("postgres-project")
public class ProjectDataAccessService implements ProjectDao {

    private final JdbcTemplate jdbcTemplate;
    private final UserOnProjectDataAccessService userOnProjectDataAccessService;

    @Autowired
    public ProjectDataAccessService(JdbcTemplate jdbcTemplate, UserOnProjectDataAccessService userOnProjectDataAccessService) {
        this.jdbcTemplate = jdbcTemplate;
        this.userOnProjectDataAccessService = userOnProjectDataAccessService;
    }

    @Override
    public ProjectEntity insertProject(ProjectEntity project) {
        final String statement = "INSERT INTO project(title, owner_id, summary, created) " +
                "VALUES (?, ?, ?, ?)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(statement, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, project.getTitle());
            ps.setObject(2, project.getOwner().toString(), Types.OTHER);
            ps.setString(3, project.getSummary());
            ps.setDate(4, project.getCreated());
            return ps;
        }, keyHolder);

        var uid = (UUID) Objects.requireNonNull(Objects.requireNonNull(keyHolder.getKeys()).get("id"));
        var title = (String) Objects.requireNonNull(keyHolder.getKeys().get("title"));
        var ownerId = (UUID) Objects.requireNonNull(keyHolder.getKeys().get("owner_id"));
        var summary = (String) Objects.requireNonNull(keyHolder.getKeys().get("summary"));
        var created = (Date) Objects.requireNonNull(keyHolder.getKeys().get("created"));
        // TODO: request id of owner role from AccessControl
        // userOnProjectDataAccessService.assignRoleToUser(uid, ownerId, roleId);

        return new ProjectEntity(uid, title, summary, ownerId, created, null);
    }

    @Override
    public Optional<ProjectEntity> selectProjectById(UUID id) {
        final String statement = "SELECT id, title, owner_id, summary, created " +
                "FROM project " +
                "WHERE id = ?";
        Object[] args = new Object[] {id};
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    String title = resultSet.getString("title");
                    UUID ownerId = UUID.fromString(resultSet.getString("owner_id"));
                    String summary = resultSet.getString("summary");
                    Date created = resultSet.getDate("created");
                    return new ProjectEntity(id, title, summary, ownerId, created, null);
                });

        if (queryResult.size() != 1)
            return Optional.empty();

        return Optional.ofNullable(queryResult.get(0));
    }

    @Override
    public Optional<ProjectEntity> updateProjectById(UUID id, ProjectEntity project) {
        final String sql = "UPDATE project " +
                "SET title = ?, owner_id = ?, summary = ?, created = ?" +
                "WHERE id = ?";
        Object[] args = new Object[] {
                project.getTitle(),
                project.getOwner(),
                project.getSummary(),
                project.getCreated(),
                id};
        var updateResult = jdbcTemplate.update(sql, args);

        project.setId(id);

        // should raise exception
        if (updateResult == 1) {
            return Optional.of(project);
        }
        return Optional.empty();
    }

    @Override
    public List<ProjectEntity> selectProjectsByUserId(UUID userId) {
        final String statement = "SELECT project.id, title, owner_id, summary, created " +
                "FROM project " +
                "JOIN user_on_project " +
                "ON project.id = user_on_project.project_id " +
                "WHERE user_id = ?";

        Object[] args = new Object[]{userId};
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID projectId = UUID.fromString(resultSet.getString("id"));
                    String projectTitle = resultSet.getString("title");
                    String projectSummary = resultSet.getString("summary");
                    Date created = (Date) resultSet.getDate("created");
                    UUID ownerId = UUID.fromString(resultSet.getString("owner_id"));
                    return new ProjectEntity(projectId, projectTitle, projectSummary, ownerId, created, null);
                });

        if (queryResult.size() == 0)
            return Collections.emptyList();

        return queryResult;

    }

    @Override
    public int deleteProjectById(UUID id) {
        final String statement = "DELETE FROM project " +
                "WHERE id = ?";
        Object[] args = new Object[] {id};
        return jdbcTemplate.update(statement, args);
    }
}
