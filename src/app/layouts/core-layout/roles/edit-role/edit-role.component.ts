import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { allPermissions } from "app/shared/services/fakeData";
import { Permission } from "app/models/Permission";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TrackerProject } from "app/models/TrackerProject";
import { Role } from "app/models/Role";

@Component({
  selector: "app-edit-role",
  templateUrl: "./edit-role.component.html",
  styleUrls: ["./edit-role.component.css"],
})
export class EditRoleComponent implements OnInit {
  project: TrackerProject;
  selectedPermissionsList: FormControl;
  allOptions: Permission[];
  role: Role;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.project = this.data.project;
    this.role = this.data.role;
    console.log(this.project);
    this.selectedPermissionsList = new FormControl(this.role.getPermissions());
    this.allOptions = allPermissions;
  }

  comparePermissions(availableOption: Permission, selectedOption: Permission) {
    return availableOption === selectedOption;
  }

  saveRole() {
    console.log(this.selectedPermissionsList.value);
    this.role.setPermissions(this.selectedPermissionsList.value);
  }
}
