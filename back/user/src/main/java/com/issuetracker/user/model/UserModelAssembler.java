package com.issuetracker.user.model;

import com.issuetracker.user.api.UserController;
import com.issuetracker.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class UserModelAssembler extends RepresentationModelAssemblerSupport<UserEntity, UserModel> {

    @Autowired
    private UserService userService;

    public UserModelAssembler() {
        super(UserController.class, UserModel.class);
    }

    @Override
    public UserModel toModel(UserEntity entity) {
        UserModel userModel = instantiateModel(entity);
        userModel.setId(entity.getId());
        userModel.setName(entity.getName());
        userModel.setMail(entity.getMail());
        userModel.setDescription(entity.getDescription());
        userModel.setTitle(entity.getTitle());
        userModel.add(linkTo(methodOn(UserController.class).getUserById(entity.getId()))
                .withSelfRel()
        );
//        userModel.add(linkTo(methodOn(UserController.class).getAllUsers())
//                .withRel("users")
//        );
        return userModel;
    }

    public CollectionModel<UserModel> toCollectionModel(Iterable<? extends UserEntity> entities, UUID projectId) {
        CollectionModel<UserModel> userModels = super.toCollectionModel(entities);
//        userModels.add(linkTo(methodOn(UserController.class).getAllUsers()).withSelfRel());
        return userModels;
    }


}
