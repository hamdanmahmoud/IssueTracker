package com.issuetracker.user.model;

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
@JsonRootName(value = "app_user")
@Relation(collectionRelation = "users", itemRelation = "user")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserModel extends RepresentationModel<UserModel>
{
    private UUID id;
    private String name;
    private String mail;
    private String description;
    private String title;

    public UserModel(String name, String mail) {
        this.name = name;
        this.mail = mail;
    }


}