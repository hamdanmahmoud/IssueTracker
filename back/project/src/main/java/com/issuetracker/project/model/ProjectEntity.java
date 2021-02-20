package com.issuetracker.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@Entity(name = "Project")
@Table(name = "project")
public class ProjectEntity implements Serializable {
    private @Id @GeneratedValue UUID id;
    private @NotBlank String title;
    private @NotNull String summary;
    private @Id @NotNull UUID owner;
    private @Temporal(TemporalType.TIME) Date created;
    private @ElementCollection List<UUID> collaborators;

    public ProjectEntity() {

    }

    public ProjectEntity(
            @JsonProperty("title") String title,
            @JsonProperty("owner") UUID owner,
            @JsonProperty("summary") String summary,
            @JsonProperty("created") Date created,
            @JsonProperty("collaborators") List<UUID> collaborators) {
        this.title = title;
        this.owner = owner;
        this.summary = summary;
        this.created = created;
        this.collaborators = collaborators;
    }

}