package com.issuetracker.user.dao;

import com.issuetracker.user.model.UserEntity;
import com.issuetracker.user.model.UserProfile;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserDao {
    UserEntity insertUser(UserEntity user);

    Optional<UserEntity> selectUserById(UUID id);

    Optional<UserEntity> selectUserByMail(String mail);

    Optional<UserEntity> updateUserById(UUID id, UserEntity user);

//    Optional<List<UserEntity>> selectUsersByProjectId(UUID projectId);

    int updateProfilePicture(UUID id, String file);

    Optional<String> getProfilePicture(UUID id);

    void updateUserProfileById(UUID id, UserProfile userProfile);

}
