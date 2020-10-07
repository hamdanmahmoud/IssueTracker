import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TrackerProject } from "app/models/TrackerProject";
import { User } from "app/models/User";
import { ManageUserRolesComponent } from "../manage-user-roles/manage-user-roles.component";
import { getUsersOfProjectById } from "../../../../fake/fakeData";

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users-on-project.component.html",
  styleUrls: ["./manage-users-on-project.component.css"],
})
export class ManageUsersOnProject implements OnInit {
  project: TrackerProject;
  selectedOption: FormControl;
  allUsers: User[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.project = this.data.project;
    this.selectedOption = new FormControl();
    this.allUsers = getUsersOfProjectById(this.project.id);
    console.log(this.allUsers);
  }

  compareUsers(availableOption: User, selectedOption: User) {
    return availableOption.getId() === selectedOption.getId();
  }

  editUser(event: Event, user: User) {
    console.log("Clicked manage permissions for user");
    console.log(event, user);

    // disabling option check - do not remove following two lines
    event.preventDefault();
    event.stopPropagation();

    const dialogRef = this.dialog.open(ManageUserRolesComponent, {
      width: "20rem",
      height: "30rem",
      data: { user: user, projectId: this.project.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  saveModifications() {
    throw "Not implemented";
  }
}
