package com.issuetracker.issue.api;

import com.issuetracker.issue.model.*;
import com.issuetracker.issue.service.IssueService;
import com.issuetracker.issue.service.UserOnIssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequestMapping("issue/api/issues")
@RestController
public class IssueController {

    private final IssueService issueService;
    private final UserOnIssueService userOnIssueService;
    private final IssueModelAssembler issueModelAssembler;

    @Autowired
    public IssueController(IssueService issueService, UserOnIssueService userOnIssueService, IssueModelAssembler issueModelAssembler) {
        this.issueService = issueService;
        this.userOnIssueService = userOnIssueService;
        this.issueModelAssembler = issueModelAssembler;
    }


    @PostMapping
    public ResponseEntity<IssueModel> addIssue(@Valid @NonNull @RequestBody IssueModel issueModel){
        var name = issueModel.getName();
        var reporterId = issueModel.getReporter();
        var projectId = issueModel.getProject();
        var description = issueModel.getDescription();
        var status = issueModel.getStatus();
        var type = issueModel.getType();
        var priority = issueModel.getPriority();
        var summary = issueModel.getSummary();
        var created = issueModel.getCreated();
        var assignees = issueModel.getAssignees();

        System.out.println(issueModel.toString());

        if (!issueService.isProjectIdValid(projectId) || !issueService.isUserIdValid(reporterId)) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        }

        Optional<IssueEntity> issueEntity = issueService.addIssue(
                new IssueEntity(
                        name,
                        projectId,
                        reporterId,
                        description,
                        status,
                        type,
                        priority,
                        summary,
                        created,
                        assignees
                )
        );

        return issueEntity
                .map(issueModelAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<IssueModel> getIssueById(@PathVariable("id") UUID id){
        return issueService.getIssueById(id)
                .map(issueModelAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<CollectionModel<IssueModel>> getIssuesByUserIdOrProjectId(
            @RequestParam(value = "userId", required = false) UUID userId,
            @RequestParam(value = "projectId", required = false) UUID projectId
    ){

        if (userId == null && projectId == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        List<IssueEntity> issues = new ArrayList<>();
        if (userId != null) {
            issues = issueService.getIssuesByUserId(userId);
        }

        if (projectId != null) {
            issues = issueService.getIssuesByProjectId(projectId);
            System.out.println(issues.toString());
        }

        return new ResponseEntity<>(issueModelAssembler.toCollectionModel(issues), HttpStatus.OK);
    }

    @DeleteMapping(path = "{id}")
    public void deleteIssueById(@PathVariable("id") UUID id){
        issueService.deleteIssueById(id);
    }

    @DeleteMapping
    public void deleteIssueByProjectId(@RequestParam(value = "projectId") UUID projectId){
        issueService.deleteIssuesByProjectId(projectId);
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<IssueModel> updateIssueById(@PathVariable("id") UUID id, @Valid @NonNull @RequestBody IssueEntity issueEntity){
        return issueService.updateIssueById(id, issueEntity)
                .map(issueModelAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "{issueId}/removeUser/{userId}")
    public ResponseEntity removeUserFromIssue(@PathVariable("issueId") UUID issueId,
                                              @PathVariable("userId") UUID userId){

        if (issueService.getIssueById(issueId).isEmpty()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        var removed = userOnIssueService.removeUserFromIssue(issueId, userId);

        if (removed == 0) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return null;
    }
}
