import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { User } from "app/models/User";
import { Permission } from "../../../models/Permission";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { mahmoud, ana, hori, allPermissions } from "../../../fake/fakeData";
import { ManageUserRolesComponent } from "../roles/manage-user-roles/manage-user-roles.component";

@Component({
  selector: "app-multi-select",
  templateUrl: "./multi-select.component.html",
  styleUrls: ["./multi-select.component.css"],
})
export class MultiSelectComponent implements OnInit {
  selectedOptionsList: FormControl;
  allOptions: User[] | Permission[];
  projectId: string;
  optionsType: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selectedOptionsList = new FormControl(this.data.selectedOptionsList);
    this.projectId = this.data.projectId;

    if (!this.selectedOptionsList) return;

    switch (true) {
      case this.data.selectedOptionsList[0] instanceof User:
        this.optionsType = "assignees";
        break;
      case typeof this.data.selectedOptionsList[0] === "string":
        this.optionsType = "permissions";
        break;
      default:
        throw "Options with this type not allowed";
    }

    switch (this.optionsType) {
      case "assignees":
        this.allOptions = [mahmoud, ana, hori]; // TODO : call service (for either users on project OR permissions list)
        break;
      case "permissions":
        this.allOptions = allPermissions;
        break;
      default:
        throw "Options with this type not allowed";
    }
  }

  comparePermissions(availableOption: Permission, selectedOption: Permission) {
    return availableOption === selectedOption;
  }

  compareUsers(availableOption: User, selectedOption: User) {
    return availableOption.getId() === selectedOption.getId();
  }

  onSave() {
    // TODO: should call service with new assignees
    console.log(this.selectedOptionsList.value);
  }

  // event handler for edit button
  manageRolesForUser(event: Event, user: User) {
    console.log("Clicked manage permissions for user");
    console.log(event, user);

    // disabling option check to prevent selection of mat-option
    // as we only want to click on the edit button, not on the option itself
    // DO NOT remove following two lines
    event.preventDefault();
    event.stopPropagation();

    const dialogRef = this.dialog.open(ManageUserRolesComponent, {
      width: "20rem",
      height: "30rem",
      data: { user: user, projectId: this.projectId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
