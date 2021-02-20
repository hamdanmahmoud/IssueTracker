package com.issuetracker.project.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "UserOnProject")
@Table(name = "user_on_project")
public class UserOnProjectEntity implements Serializable {

    private @Id @GeneratedValue UUID id;
    private @Id @NotNull UUID userId;
    private @Id @NotNull UUID projectId;

    public UserOnProjectEntity(
            UUID userId,
            UUID projectId) {
        this.userId = userId;
        this.projectId = projectId;
    }

}
