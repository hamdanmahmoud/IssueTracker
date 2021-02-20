package com.issuetracker.auth.dao;

import com.issuetracker.auth.model.ApplicationUser;

import java.util.Optional;

public interface ApplicationUserDao {
    Optional<ApplicationUser> selectApplicationUserByMail(String username);
}
