package com.issuetracker.user.dao;

import com.issuetracker.user.model.UserEntity;
import com.issuetracker.user.model.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres-user")
public class UserDataAccessService implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public UserEntity insertUser(UserEntity user) {
        final String statement = "INSERT INTO app_user(name, mail, password) VALUES (?, ?, ?)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        try {
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(statement, PreparedStatement.RETURN_GENERATED_KEYS);
                ps.setString(1, user.getName());
                ps.setString(2, user.getMail());
                ps.setString(3, user.getPassword());

                return ps;
            }, keyHolder);

            var uid = (UUID) Objects.requireNonNull(Objects.requireNonNull(keyHolder.getKeys()).get("id"));
            var name = (String) Objects.requireNonNull(keyHolder.getKeys().get("name"));
            var mail = (String) Objects.requireNonNull(keyHolder.getKeys().get("mail"));
            var password = (String) Objects.requireNonNull(keyHolder.getKeys().get("password"));

            return new UserEntity(uid, name, mail, password);
        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public Optional<UserEntity> selectUserById(UUID id) {
        final String statement = "SELECT id, name, mail, password, title, description FROM app_user WHERE id = ?";
        Object[] args = new Object[] {id};
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID userId = UUID.fromString(resultSet.getString("id"));
                    String userName = resultSet.getString("name");
                    String userMail = resultSet.getString("mail");
                    String userPassword = resultSet.getString("password");
                    String title = resultSet.getString("title");
                    String description = resultSet.getString("description");
                    System.out.println(title + description);
                    return new UserEntity(userId, userName, userMail, userPassword, title, description);
                });

        if (queryResult.size() != 1)
            return Optional.empty();

        return Optional.ofNullable(queryResult.get(0));
    }

    @Override
    public Optional<UserEntity> selectUserByMail(String mail) {
        final String statement = "SELECT id, name, mail, password, title, description FROM app_user WHERE mail = ?";
        Object[] args = new Object[] { mail };
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID userId = UUID.fromString(resultSet.getString("id"));
                    String userName = resultSet.getString("name");
                    String userMail = resultSet.getString("mail");
                    String userPassword = resultSet.getString("password");
                    String title = resultSet.getString("title");
                    String description = resultSet.getString("description");
                    return new UserEntity(userId, userName, userMail, userPassword, title, description);
                });

        if (queryResult.size() != 1)
            return Optional.empty();

        return Optional.ofNullable(queryResult.get(0));
    }

    @Override
    public Optional<UserEntity> updateUserById(UUID id, UserEntity user) {
        final String sql = "UPDATE app_user SET name = ?, mail = ?, password = ? WHERE id = ?";
        Object[] args = new Object[] {user.getName(), user.getMail(), user.getPassword(), id};
        var updateResult = jdbcTemplate.update(sql, args);

        if (updateResult != 1)
            return Optional.empty();

        user.setId(id);
        return Optional.of(user);
    }

    @Override
    public int updateProfilePicture(UUID id, String file) {
        final String sql = "UPDATE app_user SET picture = ? WHERE id = ?";
        Object[] args = new Object[] {file, id};
        var updateResult = jdbcTemplate.update(sql, args);

        return updateResult;

    }

    @Override
    public Optional<String> getProfilePicture(UUID id) {
        final String sql = "SELECT picture FROM app_user WHERE id = ?";
        Object[] args = new Object[] {id};
        var queryResult = jdbcTemplate.query(
                sql,
                args,
                (resultSet, i) -> {
                    String picture = resultSet.getString("picture");
                    return picture;
                });
        if (queryResult == null || queryResult.size() == 0)
            return Optional.empty();

        return Optional.ofNullable(queryResult.get(0));
    }

    @Override
    public void updateUserProfileById(UUID id, UserProfile userProfile) {
        final String sql = "UPDATE app_user SET name = ?, mail = ?, description = ?, title = ? WHERE id = ?";
        Object[] args = new Object[] {
                userProfile.getName(),
                userProfile.getMail(),
                userProfile.getDescription(),
                userProfile.getTitle(),
                id
        };

        var updateResult = jdbcTemplate.update(sql, args);
        System.out.println(updateResult);
    }

}
