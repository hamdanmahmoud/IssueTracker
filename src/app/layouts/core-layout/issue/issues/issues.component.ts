import { Component, OnInit, ViewChild } from "@angular/core";
import { IssueStatus } from "../../../../models/IssueStatus";
import { Issue } from "../../../../models/Issue";
import {
  allIssues,
  columnsToDisplayForIssues,
  statusOptions,
} from "../../../../shared/services/fakeData";
import { IssuesTableComponent } from "../issues-table/issues-table.component";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { IssueDetailsComponent } from "../issue-details/issue-details.component";
@Component({
  selector: "app-issues",
  templateUrl: "./issues.component.html",
  styleUrls: [
    "./issues.component.css",
    "../../project/projects/projects.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class IssuesComponent implements OnInit {
  tasks: Issue[];
  bugs: Issue[];
  columnsToDisplayForIssues: string[];
  statusList: IssueStatus[];
  @ViewChild("bugsTable") bugsTable: IssuesTableComponent;
  @ViewChild("tasksTable") tasksTable: IssuesTableComponent;

  constructor(public dialog: MatDialog) {
    console.log("Issues");
  }

  ngOnInit(): void {
    this.tasks = allIssues.filter((issue) => issue.getType() === "task");
    this.bugs = allIssues.filter((issue) => issue.getType() === "bug");
    this.columnsToDisplayForIssues = columnsToDisplayForIssues;
    this.statusList = statusOptions;
  }

  removeSelectedIssues() {
    const bugsToRemove: Issue[] = this.bugsTable.selection.selected;
    console.log("Removing selected bugs:", bugsToRemove);

    const tasksToRemove: Issue[] = this.tasksTable.selection.selected;
    console.log("Removing selected tasks:", tasksToRemove);
  }

  selectTasks() {
    this.bugsTable.selection = new SelectionModel<Issue>(true, []);
  }

  selectBugs() {
    this.tasksTable.selection = new SelectionModel<Issue>(true, []);
  }

  openNewIssue() {
    console.log("Clicked open new issue");
    const dialogRef = this.dialog.open(IssueDetailsComponent, {
      width: "25rem",
      height: "auto",
      maxHeight: "70rem",
      data: { action: "create" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
