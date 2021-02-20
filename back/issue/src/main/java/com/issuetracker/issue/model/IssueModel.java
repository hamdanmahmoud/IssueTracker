package com.issuetracker.issue.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import javax.persistence.ElementCollection;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@JsonRootName(value = "issue")
@Relation(collectionRelation = "issues", itemRelation = "issue")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class IssueModel extends RepresentationModel<IssueModel>
{
    private UUID id;
    private String name;
    private UUID project;
    private UUID reporter;
    private List<UUID> assignees;
    private String description;
    private String status;
    private String type;
    private Integer priority;
    private String summary;
    private @Temporal(TemporalType.TIME) Date created;

    public IssueModel(String name,
                      UUID project,
                      UUID reporter,
                      List<UUID> assignees,
                      String description,
                      String status,
                      String type,
                      Integer priority,
                      String summary,
                      Date created) {
        this.name = name;
        this.project = project;
        this.reporter = reporter;
        this.assignees = assignees;
        this.description = description;
        this.status = status;
        this.type = type;
        this.priority = priority;
        this.summary = summary;
        this.created = created;
    }


}