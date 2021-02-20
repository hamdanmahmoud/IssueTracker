package com.issuetracker.project.model;

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
@JsonRootName(value = "role_on_user")
@Relation(collectionRelation = "role_on_user")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoleOnUserModel extends RepresentationModel<RoleOnUserModel> {
    private UUID roleId;
    private UUID userId;
}