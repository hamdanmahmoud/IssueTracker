import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TrackerProject } from "../../../../models/TrackerProject";
import { User } from "../../../../models/User";
import { ManageUserRolesComponent } from "../manage-user-roles/manage-user-roles.component";
import { getUsersOfProjectById } from "../../../../shared/services/fakeData";
import { UserService } from "app/shared/services/user.service";

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users-on-project.component.html",
  styleUrls: ["./manage-users-on-project.component.css"],
})
export class ManageUsersOnProject implements OnInit {
  project: TrackerProject;
  allUsers: User[];
  isAddCollabsContainerVisible: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.project = this.data.project;
    this.allUsers = await this.userService.getUsersOfProjectById(
      this.project.getId()
    );
    console.log("Retrieved", this.allUsers);
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
      data: { user: user, projectId: this.project.getId() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  public mails: any[] = [
    {
      address: "",
    },
  ];

  addMail() {
    this.mails.push({
      address: "",
    });
  }

  removeLastMail() {
    if (this.mails.length > 1) this.mails.splice(this.mails.length - 1);
  }

  sendInvitations() {
    throw "Not implemented";
  }

  openAddCollabsContainer() {
    this.isAddCollabsContainerVisible = true;
  }
}
