import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { allPermissions } from "../../../../shared/services/fakeData";
import { Permission } from "../../../../models/Permission";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TrackerProject } from "../../../../models/TrackerProject";
import { RoleService } from "app/shared/services/role.service";
import { Role } from "app/models/Role";

@Component({
  selector: "app-create-role",
  templateUrl: "./create-role.component.html",
  styleUrls: ["./create-role.component.css"],
})
export class CreateRoleComponent implements OnInit {
  project: TrackerProject;
  selectedPermissionsList: FormControl;
  allOptions: Permission[];
  roleName: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.project = this.data.project;
    console.log(this.project);
    this.selectedPermissionsList = new FormControl([]);
    this.allOptions = allPermissions;
  }

  comparePermissions(availableOption: Permission, selectedOption: Permission) {
    return availableOption === selectedOption;
  }

  saveRole() {
    console.log(this.roleName);
    console.log(this.selectedPermissionsList.value);
    const newRole = new Role();
    newRole.setAuthority(this.roleName);
    newRole.setPermissions(this.selectedPermissionsList.value);
    newRole.setProjectId(this.project.getId());
    this.roleService.createRole(newRole);
  }
}
