package com.issuetracker.project.service;

import com.issuetracker.project.dao.UserOnProjectDao;
import com.issuetracker.project.model.RoleDetails;
import com.issuetracker.project.model.RoleDetailsWithPermissions;
import com.issuetracker.project.model.RoleOnUserEntity;
import com.issuetracker.project.model.UserOnProjectEntity;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserOnProjectService {

    private final UserOnProjectDao userOnProjectDao;

    public UserOnProjectService(@Qualifier("postgres-useronproject") UserOnProjectDao userOnProjectDao) {
        this.userOnProjectDao = userOnProjectDao;
    }

    public UserOnProjectEntity addUserOnProject(UserOnProjectEntity userOnProjectEntity){
        return userOnProjectDao.insertUserOnProject(userOnProjectEntity);
    }

    public List<UUID> getUserIdsByProjectId(UUID projectId) {
        return userOnProjectDao.selectUserIdsByProjectId(projectId);
    }

    public Optional<RoleOnUserEntity> assignRoleToUser(UUID projectId, UUID userId, UUID roleId) {
        return userOnProjectDao.assignRoleToUser(projectId, userId, roleId);
    }

    public int removeRoleFromUser(UUID projectId, UUID userId, UUID roleId) {
        return userOnProjectDao.removeRoleFromUser(projectId, userId, roleId);
    }

    public List<UUID> getUserIdsByRoleId(UUID roleId) { // returns user ids that have a role on a specific project
        return userOnProjectDao.selectUserIdsByRoleId(roleId);
    }

    public UUID getUserIdFromUserOnProjectId(UUID userOnProjectId) {
        return userOnProjectDao.selectUserIdFromUserOnProjectId(userOnProjectId);
    }

    public int removeUserFromProject(UUID projectId, UUID userId) {
        return userOnProjectDao.removeUserFromProject(projectId, userId);
    }

    public List<UUID> getRoleIdsByUserId(UUID userId, UUID projectId) {
        return userOnProjectDao.selectRoleIdsByUserId(userId, projectId);
    }

    public int removeAllRolesFromUserByProjectId(UUID projectId, UUID userId) {
        return userOnProjectDao.removeAllRolesFromUserByProjectId(projectId, userId);
    }

    public void updateUserRolesByProjectId(UUID projectId, UUID userId, ArrayList<RoleDetailsWithPermissions> roles) {
        this.removeAllRolesFromUserByProjectId(projectId, userId);
        roles.forEach(
             role -> this.assignRoleToUser(projectId, userId, role.getId())
        );
    }

}
