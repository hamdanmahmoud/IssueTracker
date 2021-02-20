package com.issuetracker.project.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.Valid;
import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@JsonRootName(value = "project")
@Relation(collectionRelation = "projects", itemRelation = "project")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectModel extends RepresentationModel<ProjectModel> {
    @Valid
    private UUID id;

    @Valid @NonNull
    private String title;

    @Valid @NonNull
    private UUID owner;

    @Valid @NonNull
    private String summary;

    @Valid @NonNull
    private List<UUID> collaborators;

    private @Temporal(TemporalType.TIME) Date created;

    public ProjectModel(
            @JsonProperty("title") @NonNull String title,
            @JsonProperty("owner") @NonNull UUID owner,
            @JsonProperty("collaborators") @NonNull List<UUID> collaborators,
            @JsonProperty("summary") @NonNull String summary,
            @JsonProperty("created") @NonNull Date created) {
        this.title = title;
        this.owner = owner;
        this.collaborators = collaborators;
        this.summary = summary;
        this.created = created;
    }
}