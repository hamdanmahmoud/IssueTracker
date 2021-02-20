package com.issuetracker.user.api;

import com.issuetracker.user.model.UserEntity;
import com.issuetracker.user.model.UserModel;
import com.issuetracker.user.model.UserModelAssembler;
import com.issuetracker.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("user/register")
@RestController
public class RegisterController {
    private final UserService userService;
    private final UserModelAssembler userModelAssembler;

    @Autowired
    public RegisterController(UserService userService, UserModelAssembler userModelAssembler) {
        this.userService = userService;
        this.userModelAssembler = userModelAssembler;
    }

    @PostMapping
    public ResponseEntity<UserModel> addUser(@Valid @NonNull @RequestBody UserEntity userEntity){
        var userModelName = userEntity.getName();
        var userModelMail = userEntity.getMail();
        var userModelPassword = userEntity.getPassword();

        var addedUser = userService.addUser(new UserEntity(userModelName, userModelMail, userModelPassword));

        if (addedUser == null)
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        return userService.getUserById(addedUser.getId())
                .map(userModelAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
