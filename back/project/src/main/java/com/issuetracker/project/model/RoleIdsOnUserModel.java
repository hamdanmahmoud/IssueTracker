package com.issuetracker.project.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoleIdsOnUserModel extends RepresentationModel<RoleIdsOnUserModel> {
    private UUID userId;
    private List<UUID> roleIds;
}
