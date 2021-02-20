package com.issuetracker.project.model;

import com.issuetracker.project.api.ProjectController;
import com.issuetracker.project.service.UserOnProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class ProjectModelAssembler extends RepresentationModelAssemblerSupport<ProjectEntity, ProjectModel> {

    @Autowired
    private UserOnProjectService userOnProjectService;

    public ProjectModelAssembler() {
        super(ProjectController.class, ProjectModel.class);
    }

    @Override
    public ProjectModel toModel(ProjectEntity entity) {
        ProjectModel projectModel = instantiateModel(entity);

        projectModel.setId(entity.getId());
        projectModel.setTitle(entity.getTitle());
        projectModel.setOwner(entity.getOwner());
        projectModel.setCreated(entity.getCreated());
        projectModel.setSummary(entity.getSummary());
        projectModel.setCollaborators(this.getCollaborators(entity.getId(), entity.getOwner()));
        projectModel.add(linkTo(methodOn(ProjectController.class).getProjectById(entity.getId()))
                .withSelfRel()
        );
        return projectModel;
    }

    @Override
    public CollectionModel<ProjectModel> toCollectionModel(Iterable<? extends ProjectEntity> entities) {
        CollectionModel<ProjectModel> projectModels = super.toCollectionModel(entities);
        return projectModels;
    }

    private List<UUID> getCollaborators(UUID projectId, UUID ownerId) {
        var userIds = userOnProjectService.getUserIdsByProjectId(projectId);
        // removing owner from collaborators list
        userIds = userIds.stream().filter(userId -> !userId.equals(ownerId)).collect(Collectors.toList());

        if (userIds.isEmpty()) return Collections.emptyList();

        return userIds;

    }

}
