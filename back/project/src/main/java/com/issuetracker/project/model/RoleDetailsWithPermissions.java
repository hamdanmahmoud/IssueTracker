package com.issuetracker.project.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class RoleDetailsWithPermissions {

    private UUID id;
    private String authority;
    private UUID projectId;
    private List<String> permissions;

    public RoleDetailsWithPermissions(String authority, UUID projectId, List<String> permissions) {
        this.authority = authority;
        this.projectId = projectId;
        this.permissions = permissions;
    }
}