import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { User } from "../../../models/User";
import { Permission } from "../../../models/Permission";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { ManageUserRolesComponent } from "../roles/manage-user-roles/manage-user-roles.component";
import { RestApiService } from "app/shared/services/rest-api.service";
import { IssueService } from "app/shared/services/issue.service";
import { Issue } from "app/models/Issue";

@Component({
  selector: "app-multi-select",
  templateUrl: "./multi-select.component.html",
  styleUrls: ["./multi-select.component.css"],
})
export class MultiSelectComponent implements OnInit {
  selectedOptionsList: FormControl;
  allOptions: User[] | Permission[];
  projectId: string;
  selectedIssue: Issue;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private apiService: RestApiService,
    private issueService: IssueService
  ) {}

  async ngOnInit(): Promise<void> {
    this.selectedIssue = this.data.selectedIssue;

    await Promise.all(
      this.selectedIssue.getAssignees().map(async (id) => {
        console.log(id);
        return await this.apiService.getUserById(id);
      })
    ).then(
      (selectedOptions) =>
        (this.selectedOptionsList = new FormControl(selectedOptions))
    );

    this.projectId = this.data.projectId;

    if (!this.selectedOptionsList) return;

    this.allOptions = await this.apiService.getUsersOfProjectById(
      this.projectId
    );
  }

  comparePermissions(availableOption: Permission, selectedOption: Permission) {
    return availableOption === selectedOption;
  }

  compareUsers(availableOption: User, selectedOption: User) {
    return availableOption.getId() === selectedOption.getId();
  }

  saveModifications() {
    // TODO: should call service with new assignees
    console.log(this.selectedOptionsList.value);
    this.selectedIssue.setAssignees([
      ...this.selectedOptionsList.value.map((assignee) => assignee.getId()),
    ]);
    this.issueService
      .updateIssue(this.selectedIssue)
      .then((issue) => console.log(issue));
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
