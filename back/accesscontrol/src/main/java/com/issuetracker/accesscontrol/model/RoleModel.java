package com.issuetracker.accesscontrol.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import java.util.Collection;
import java.util.UUID;

/**
 * This class is the external representation of
 * the Role resource, so we can pick what our resource
 * looks like to the clients
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@JsonRootName(value = "role")
@Relation(collectionRelation = "roles", itemRelation = "role")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoleModel extends RepresentationModel<RoleModel> {
    private UUID id;
    private String authority;
    private UUID projectId;
    private Collection<Permission> permissions;
}
