package com.issuetracker.issue.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@JsonRootName(value = "user_assigned_on_issue")
@Relation(collectionRelation = "user_assigned_on_issue")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserOnIssueModel extends RepresentationModel<UserOnIssueModel> {
    private UUID issueId;
    private UUID userId;
}