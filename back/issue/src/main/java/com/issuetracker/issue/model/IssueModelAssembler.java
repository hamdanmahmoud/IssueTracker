package com.issuetracker.issue.model;

import com.issuetracker.issue.api.IssueController;
import com.issuetracker.issue.service.IssueService;
import com.issuetracker.issue.service.UserOnIssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class IssueModelAssembler extends RepresentationModelAssemblerSupport<IssueEntity, IssueModel> {

    private UserOnIssueService userOnIssueService;

    @Autowired
    public IssueModelAssembler(UserOnIssueService userOnIssueService) {
        super(IssueController.class, IssueModel.class);
        this.userOnIssueService = userOnIssueService;
    }

    @Override
    public IssueModel toModel(IssueEntity entity) {
        IssueModel issueModel = instantiateModel(entity);
        issueModel.setId(entity.getId());
        issueModel.setName(entity.getName());
        issueModel.setProject(entity.getProject());
        issueModel.setReporter(entity.getReporter());
        issueModel.setAssignees(getAssigneesByIssueId(entity.getId()));
        issueModel.setDescription(entity.getDescription());
        issueModel.setStatus(entity.getStatus());
        issueModel.setType(entity.getType());
        issueModel.setProgress(entity.getProgress());
        issueModel.setSummary(entity.getSummary());
        issueModel.setCreated(entity.getCreated());
        issueModel.setAssignees(entity.getAssignees());
        issueModel.add(linkTo(methodOn(IssueController.class).getIssueById(entity.getId()))
                .withSelfRel()
        );
//        issueModel.add(linkTo(methodOn(IssueController.class).getAllIssues())
//                .withRel("issues")
//        );
        return issueModel;
    }

    @Override
    public CollectionModel<IssueModel> toCollectionModel(Iterable<? extends IssueEntity> entities) {
        CollectionModel<IssueModel> issueModels = super.toCollectionModel(entities);
//        issueModels.add(linkTo(methodOn(IssueController.class).getAllIssues()).withSelfRel());
        return issueModels;
    }

    private List<UUID> getAssigneesByIssueId(UUID issueId) {
        return userOnIssueService.getAssigneesByIssueId(issueId);
    }

}
