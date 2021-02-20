package com.issuetracker.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.UUID;

@AllArgsConstructor
@Data
@Entity(name = "User")
@Table(name = "app_user")
public class UserEntity implements Serializable {
    private @Id @GeneratedValue UUID id;

    @NotBlank
    private String name;

    @NotBlank
    private String mail;

    @NotBlank
    private String password;

    private String title;

    private String description;

    private String picture;

    public UserEntity() {

    }

    public UserEntity(UUID id, String name, String mail, String password) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.password = password;
    }

    public UserEntity(@JsonProperty("name") String name,
                      @JsonProperty("mail") String mail,
                      @JsonProperty("password") String password) {
        this.name = name;
        this.mail = mail;
        this.password = password;
    }

    public UserEntity(UUID id, String name, String mail, String password, String title, String description) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.password = password;
        this.title = title;
        this.description = description;
    }
}
