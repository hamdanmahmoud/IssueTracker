package com.issuetracker.user.service;

import com.issuetracker.user.dao.UserDao;
import com.issuetracker.user.model.UserEntity;
import com.issuetracker.user.model.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(@Qualifier("postgres-user") UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity addUser(UserEntity user){
        var encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userDao.insertUser(user);
    }

    public Optional<UserEntity> getUserById(UUID id){
        return userDao.selectUserById(id);
    }

    public Optional<UserEntity> getUserByMail(String mail) {
        return userDao.selectUserByMail(mail);
    }

    public Optional<UserEntity> updateUserById(UUID id, UserEntity updatedUser){
        return userDao.updateUserById(id, updatedUser);
    }

    public int updateProfilePicture(UUID id, String file) {
        return userDao.updateProfilePicture(id, file);
    }

    public Optional<String> getProfilePicture(UUID id) {
        return userDao.getProfilePicture(id);
    }

    public void updateUserProfileById(UUID id, UserProfile user) { userDao.updateUserProfileById(id, user);}

}
