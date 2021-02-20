package com.issuetracker.accesscontrol.dao;

import com.issuetracker.accesscontrol.model.Permission;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Types;
import java.util.*;

@Repository("postgres-permission-repository")
public class PermissionDataAccessService implements PermissionDao {

    private final JdbcTemplate jdbcTemplate;

    public PermissionDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Permission insertPermission(UUID roleId, String authority) {
        final String statement = "INSERT INTO permission(role_id, authority) VALUES (?, ?)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(statement, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setObject(1, roleId.toString(), Types.OTHER);
            ps.setString(2, authority);
            return ps;
        }, keyHolder);

        return new Permission(roleId, authority);
    }

    @Override
    public Optional<List<Permission>> selectPermissionsByRoleId(UUID roleId) {
        final String statement = "SELECT authority FROM permission WHERE role_id = ?";
        Object[] args = new Object[] { roleId };
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    String authority = resultSet.getString("authority");
                    return new Permission(roleId, authority);
                });

        if (queryResult.size() != 0) {
            return Optional.ofNullable(queryResult);
        }

        return Optional.empty();
    }

    /**
     * This method is used to rather check if a permission
     * is actually defined with a specific name (authority)
     * and for a specific roleId
     * @param roleId
     * @param authority
     * @return
     */
    @Override
    public Optional<Permission> selectPermissionByName(UUID roleId, String authority) {
        final String statement = "SELECT 1 FROM permission WHERE role_id = ? AND authority = ? LIMIT 1";
        Object[] args = new Object[] { roleId, authority };
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    return new Permission(roleId, authority);
                });

        if (queryResult.size() != 0) {
            return Optional.ofNullable(queryResult.get(0));
        }

        return Optional.empty();
    }

    @Override
    public int deletePermission(UUID roleId, String authority) {
        final String statement = "DELETE FROM permission WHERE role_id = ? AND authority = ?";
        Object[] args = new Object[] { roleId, authority };
        return jdbcTemplate.update(statement, args);
    }
}
