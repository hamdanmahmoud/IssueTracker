package com.issuetracker.auth.dao;

import com.issuetracker.auth.model.ApplicationUser;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres-user")
public class ApplicationUserDaoService implements ApplicationUserDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ApplicationUserDaoService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<ApplicationUser> selectApplicationUserByMail(String mail) {
        final String statement = "SELECT id, name, password FROM app_user WHERE mail = ?";

        Object[] args = new Object[] { mail };
        var queryResult = jdbcTemplate.query(
                statement,
                args,
                (resultSet, i) -> {
                    UUID userId = UUID.fromString(resultSet.getString("id"));
                    String userPassword = resultSet.getString("password");
                    String name = resultSet.getString("name");
                    return ApplicationUser.builder()
                            .id(userId)
                            .roles(Collections.emptySet())
                            .username(mail)
                            .name(name)
                            .password(userPassword)
                            .accountExpired(false)
                            .accountLocked(false)
                            .credentialsExpired(false)
                            .disabled(false)
                            .build();
                });

        if (queryResult.size() == 0)
            return Optional.empty();

        return Optional.ofNullable(queryResult.get(0));
    }



}
