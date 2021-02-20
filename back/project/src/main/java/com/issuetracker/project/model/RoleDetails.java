package com.issuetracker.project.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class RoleDetails {

    private UUID id;
    private String authority;
    private UUID projectId;

    // when we deserialize object from accesscontrol, permissions field
    // holds "_links" attributes and more, and if we allow setter on this
    // property, an exception will be raised, so leave this READ_ONLY
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<String> permissions;

    public RoleDetails (String authority, UUID projectId, List<String> permissions) {
        this.authority = authority;
        this.projectId = projectId;
        this.permissions = permissions;
    }
}