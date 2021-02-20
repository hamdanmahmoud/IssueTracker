package com.issuetracker.project.dao;

import com.issuetracker.project.model.ProjectEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectDao {
    ProjectEntity insertProject(ProjectEntity project);

    Optional<ProjectEntity> selectProjectById(UUID id);

    Optional<ProjectEntity> updateProjectById(UUID id, ProjectEntity project);

    List<ProjectEntity> selectProjectsByUserId(UUID userId);

    int deleteProjectById(UUID id);

}
