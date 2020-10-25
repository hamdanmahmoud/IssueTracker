import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { allPermissions } from "../../../../shared/services/fakeData";
import { Permission } from "../../../../models/Permission";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TrackerProject } from "../../../../models/TrackerProject";

@Component({
  selector: "app-create-role",
  templateUrl: "./create-role.component.html",
  styleUrls: ["./create-role.component.css"],
})
export class CreateRoleComponent implements OnInit {
  project: TrackerProject;
  selectedPermissionsList: FormControl;
  allOptions: Permission[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

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
    console.log(this.selectedPermissionsList.value);
  }
}
