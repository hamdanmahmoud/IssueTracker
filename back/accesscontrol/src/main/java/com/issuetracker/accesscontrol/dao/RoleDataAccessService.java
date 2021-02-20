package com.issuetracker.accesscontrol.dao;

import com.issuetracker.accesscontrol.model.Role;
import com.issuetracker.accesscontrol.service.PermissionService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Types;
import java.util.*;

@Repository("postgres-role-repository")
public class RoleDataAccessService implements RoleDao {

    private final JdbcTemplate jdbcTemplate;
    private final PermissionService permissionService;

    public RoleDataAccessService(JdbcTemplate jdbcTemplate, PermissionService permissionService) {
        this.jdbcTemplate = jdbcTemplate;
        this.permissionService = permissionService;
    }

    @Override
    public Role insertRole(Role role) {
        final String statement = "INSERT INTO role(authority, project_id) VALUES (?, ?)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        try {
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(statement, PreparedStatement.RETURN_GENERATED_KEYS);
                ps.setString(1, role.getAuthority().toUpperCase());
                ps.setObject(2, role.getProjectId().toString(), Types.OTHER);
                return ps;
            }, keyHolder);
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        var uid = (UUID) Objects.requireNonNull(keyHolder.getKeys().get("id"));
        var authority = (String) Objects.requireNonNull(keyHolder.getKeys().get("authority"));
        var projectId = (UUID) Objects.requireNonNull(keyHolder.getKeys().get("project_id"));

        return new Role(uid, authority, projectId);
    }

    @Override
    public Optional<Role> selectRoleById(UUID roleId) {
        final String statement = "SELECT id, authority, project_id FROM role WHERE id = ?";
        Object[] args = new Object[] {roleId};
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    String authority = resultSet.getString("authority");
                    UUID projectId = UUID.fromString(resultSet.getString("project_id"));
                    return new Role(roleId, authority, projectId);
                });

        if (queryResult.size() == 1) {
            return Optional.ofNullable(queryResult.get(0));
        }

        return Optional.empty();
    }

    @Override
    public List<Role> selectRolesByProjectId(UUID projectId) {
        final String statement = "SELECT id, authority FROM role WHERE project_id = ?";
        Object[] args = new Object[] { projectId };
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID roleId = UUID.fromString(resultSet.getString("id"));
                    String authority = resultSet.getString("authority");
                    return new Role(roleId, authority, projectId);
                });

        return queryResult;
    }

    @Override
    public Optional<Role> updateRoleById(UUID id, Role role) {
        final String sql = "UPDATE role SET authority = ? WHERE id = ?"; // only authority (name) should be modifiable
        Object[] args = new Object[] {role.getAuthority().toUpperCase(), id};
        var updateResult = jdbcTemplate.update(sql, args);

        if (updateResult == 1) {
            return Optional.of(role);
        }

        return Optional.empty();
    }

    @Override
    public int deleteRoleById(UUID roleId) {
        final String statement = "DELETE FROM role WHERE id = ?";
        Object[] args = new Object[] {roleId};
        return jdbcTemplate.update(statement, args);
    }
}
