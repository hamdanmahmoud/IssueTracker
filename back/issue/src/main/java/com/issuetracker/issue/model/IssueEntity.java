package com.issuetracker.issue.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Data
@Entity(name = "Issue")
@Table(name = "issue")
@AllArgsConstructor
@NoArgsConstructor
public class IssueEntity implements Serializable {
    private @Id @GeneratedValue UUID id;
    private String name;
    private @Id UUID project;
    private @Id UUID reporter;
    private @Id @NotBlank String description;
    private @NotBlank String status;
    private @NotBlank String type;
    private Integer progress;
    private @NotBlank String summary;
    private @Temporal(TemporalType.TIME) Date created;
    private @ElementCollection @NotNull List<UUID> assignees;

    public IssueEntity(
            @JsonProperty String name,
            @JsonProperty UUID project,
            @JsonProperty UUID reporter,
            @JsonProperty String description,
            @JsonProperty String status,
            @JsonProperty String type,
            @JsonProperty Integer progress,
            @JsonProperty String summary,
            @JsonProperty Date created,
            @JsonProperty List<UUID> assignees) {
        this.name = name;
        this.project = project;
        this.reporter = reporter;
        this.description = description;
        this.status = status;
        this.type = type;
        this.progress = progress;
        this.summary = summary;
        this.created = created;
        this.assignees = assignees;
    }

}