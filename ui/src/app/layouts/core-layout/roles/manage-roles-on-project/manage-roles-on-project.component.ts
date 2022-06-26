import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Role } from "../../../../models/Role";
import { TrackerProject } from "../../../../models/TrackerProject";
import { CreateRoleComponent } from "../create-role/create-role.component";
import { EditRoleComponent } from "../edit-role/edit-role.component";
import { RoleService } from "app/shared/services/role.service";

@Component({
  selector: "app-manage-roles-on-project",
  templateUrl: "./manage-roles-on-project.component.html",
  styleUrls: ["./manage-roles-on-project.component.scss"],
})
export class ManageRolesOnProjectComponent implements OnInit {
  selectedRolesList: FormControl;
  projectId: string;
  project: TrackerProject;
  allOptions: Role[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private roleService: RoleService
  ) {}

  async ngOnInit() {
    this.selectedRolesList = new FormControl([]);
    this.project = this.data.project;
    this.projectId = this.project.getId();
    this.allOptions = await this.roleService.getRolesOfProjectById(
      this.projectId
    );
    console.log("Retrieved", this.allOptions);
  }

  compareRoles(availableOption: Role, selectedOption: Role) {
    return availableOption.getId() === selectedOption.getId();
  }

  editRole(event, role) {
    console.log("Clicked manage role for a role");
    console.log(event, role);

    // disabling option check - do not remove following two lines
    event.preventDefault();
    event.stopPropagation();

    const dialogRef = this.dialog.open(EditRoleComponent, {
      width: "20rem",
      height: "30rem",
      data: { project: this.project, role: role },
      autoFocus: false,
    });

    dialogRef.componentInstance.save.subscribe((res) => {
      console.log("Closing dialog...");
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  removeRole(event, role) {
    //TODO: open dialogue for confirmation => PUT method to update db
    console.log("Clicked manage role for a role");
    console.log(event, role);

    // disabling option check - do not remove following two lines
    event.preventDefault();
    event.stopPropagation();

    //TODO: do something
    const index = this.project.getRoles().indexOf(role);
    const roles = this.project.getRoles();
    const modifiedRoles = [...roles.slice(0, index), ...roles.slice(index + 1)]; // to respect immutability
    this.project.setRoles(modifiedRoles);
    this.allOptions = this.project.getRoles();
  }

  openNewRole() {
    console.log("Clicked open create role");
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      width: "20rem",
      height: "auto",
      data: { project: this.project },
    });

    dialogRef.componentInstance.save.subscribe((res) => {
      dialogRef.close();
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
