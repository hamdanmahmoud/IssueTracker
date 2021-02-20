package com.issuetracker.project.dao;


import com.issuetracker.project.model.RoleOnUserEntity;
import com.issuetracker.project.model.UserOnProjectEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface UserOnProjectDao {
    UserOnProjectEntity insertUserOnProject(UserOnProjectEntity userOnProject);

    List<UUID> selectUserIdsByProjectId(UUID projectId);

    List<UUID> selectUserIdsByRoleId(UUID roleId);

    Optional<RoleOnUserEntity> assignRoleToUser(UUID projectId, UUID userId, UUID roleId);

    int removeRoleFromUser(UUID projectId, UUID userId, UUID roleId);

    UUID selectUserIdFromUserOnProjectId(UUID userOnProjectId);

    int removeUserFromProject(UUID projectId, UUID userId);

    List<UUID> selectRoleIdsByUserId(UUID userId, UUID projectId);

    int removeAllRolesFromUserByProjectId(UUID projectId, UUID userId);

}
