package com.issuetracker.project.dao;

import com.issuetracker.project.model.RoleOnUserEntity;
import com.issuetracker.project.model.UserOnProjectEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Types;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres-useronproject")
public class UserOnProjectDataAccessService implements UserOnProjectDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserOnProjectDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public UserOnProjectEntity insertUserOnProject(UserOnProjectEntity userOnProject) {
        final String statement = "INSERT INTO user_on_project(project_id, user_id) " +
                "VALUES (?, ?)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(statement, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setObject(1, userOnProject.getProjectId(), Types.OTHER);
            ps.setObject(2, userOnProject.getUserId().toString(), Types.OTHER);
            return ps;
        }, keyHolder);

        var uid = (UUID) Objects.requireNonNull(Objects.requireNonNull(keyHolder.getKeys()).get("id"));
        var projectId = (UUID) Objects.requireNonNull(keyHolder.getKeys().get("project_id"));
        var userId = (UUID) Objects.requireNonNull(keyHolder.getKeys().get("user_id"));

        return new UserOnProjectEntity(uid, userId, projectId);
    }

    @Override
    public List<UUID> selectUserIdsByProjectId(UUID projectId) {
        final String statement = "SELECT id, project_id, user_id " +
                "FROM user_on_project " +
                "WHERE project_id = ?";
        Object[] args = new Object[] {projectId};
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
    public List<UUID> selectUserIdsByRoleId(UUID roleId) {
        final String statement = "SELECT user_id " +
                "FROM user_on_project " +
                "JOIN role_on_user " +
                "ON user_on_project.id = role_on_user.user_on_project_id " +
                "WHERE role_id = ?";
        Object[] args = new Object[] {roleId};
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
    public Optional<RoleOnUserEntity> assignRoleToUser(UUID projectId, UUID userId, UUID roleId) {
        final String statement = "INSERT INTO role_on_user(user_on_project_id, role_id) " +
                "SELECT id, ? AS role_id FROM user_on_project WHERE project_id = ? AND user_id = ?";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(statement, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setObject(1, roleId, Types.OTHER);
            ps.setObject(2, projectId, Types.OTHER);
            ps.setObject(3, userId, Types.OTHER);

            return ps;
        }, keyHolder);

        var userOnProjectId = (UUID) Objects.requireNonNull(keyHolder.getKeys().get("user_on_project_id"));
        var roleOnUser = new RoleOnUserEntity(roleId, userOnProjectId);

        return Optional.of(roleOnUser);
    }

    @Override
    public int removeRoleFromUser(UUID projectId, UUID userId, UUID roleId) {
        final String statement = "DELETE FROM role_on_user " +
                "WHERE role_id = ? AND user_on_project_id = (SELECT id FROM user_on_project " +
                "WHERE project_id = ? AND user_id = ?)";
        Object[] args = new Object[] {roleId, projectId, userId};
        return jdbcTemplate.update(statement, args);
    }

    @Override
    public UUID selectUserIdFromUserOnProjectId(UUID userOnProjectId) {
        final String statement = "SELECT user_id " +
                "FROM user_on_project " +
                "WHERE id = ?";
        Object[] args = new Object[] {userOnProjectId};
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID userId = UUID.fromString(resultSet.getString("user_id"));
                    return userId;
                });

        return queryResult.get(0);
    }

    @Override
    public int removeUserFromProject(UUID projectId, UUID userId) {
        final String statement = "DELETE FROM user_on_project " +
                "WHERE project_id = ? AND user_id = ?";
        Object[] args = new Object[] {projectId, userId};
        return jdbcTemplate.update(statement, args);
    }

    @Override
    public List<UUID> selectRoleIdsByUserId(UUID userId, UUID projectId) {
        String statement = "SELECT role_id " +
                "FROM role_on_user " +
                "INNER JOIN user_on_project " +
                "ON (role_on_user.user_on_project_id = user_on_project.id) " +
                "WHERE user_on_project.user_id = ?";

        Object[] args = null;
        if (projectId != null){
            statement = statement.concat(" AND user_on_project.project_id = ?");
            args = new Object[] {userId, projectId};
        } else {
            args = new Object[] {userId};
        }

        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID roleId = UUID.fromString(resultSet.getString("role_id"));
                    return roleId;
                });

        return queryResult;
    }

    @Override
    public int removeAllRolesFromUserByProjectId(UUID projectId, UUID userId) {
        final String statement = "DELETE FROM role_on_user USING user_on_project WHERE role_on_user.user_on_project_id = user_on_project.id  AND project_id = ? AND user_id = ?";
        Object[] args = new Object[] {projectId, userId};
        return jdbcTemplate.update(statement, args);
    }


}
