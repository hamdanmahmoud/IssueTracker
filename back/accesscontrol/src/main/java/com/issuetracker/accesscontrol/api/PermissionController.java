package com.issuetracker.accesscontrol.api;


import com.issuetracker.accesscontrol.model.*;
import com.issuetracker.accesscontrol.service.PermissionService;
import com.issuetracker.accesscontrol.service.RoleService;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.UUID;

@RequestMapping("/acl/api/permissions")
@RestController
public class PermissionController {

    private final PermissionService permissionService;

    public PermissionController( PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping
    public Collection<Permission> getAllPermissions(){
        return permissionService.getAllPermissions();
    }
}
