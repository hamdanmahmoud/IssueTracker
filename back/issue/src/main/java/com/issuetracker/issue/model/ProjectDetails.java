package com.issuetracker.issue.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@AllArgsConstructor
public class ProjectDetails {

    private UUID id;
    private String name;
    private UUID owner;

    // when we deserialize object from project, userIds field
    // holds "_links" attributes and more, and if we allow setter on this
    // property, an exception will be raised, so leave this READ_ONLY
//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<UUID> collaborators;

}