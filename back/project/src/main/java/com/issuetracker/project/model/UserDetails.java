package com.issuetracker.project.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class UserDetails {

    private UUID id;
    private String name;
    private String mail;
}