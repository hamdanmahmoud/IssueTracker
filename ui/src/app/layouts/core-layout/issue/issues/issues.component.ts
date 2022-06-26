import { Component, OnInit, ViewChild } from "@angular/core";
import { IssueStatus } from "../../../../models/IssueStatus";
import { Issue } from "../../../../models/Issue";
import {
  columnsToDisplayForIssues,
  statusOptions,
} from "../../../../shared/services/appData";
import { IssuesTableComponent } from "../issues-table/issues-table.component";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { IssueDetailsComponent } from "../issue-details/issue-details.component";
import { IssueService } from "app/shared/services/issue.service";
import { IssueTypeName } from "app/models/IssueType";
@Component({
  selector: "app-issues",
  templateUrl: "./issues.component.html",
  styleUrls: [
    "./issues.component.css",
    "../../project/projects/projects.component.css",
  ],
})
export class IssuesComponent implements OnInit {
  allIssues: Issue[];
  tasks: Issue[];
  bugs: Issue[];
  columnsToDisplayForIssues: string[];
  statusList: IssueStatus[];
  @ViewChild("bugsTable") bugsTable: IssuesTableComponent;
  @ViewChild("tasksTable") tasksTable: IssuesTableComponent;

  constructor(public dialog: MatDialog, private issueService: IssueService) {
    console.log("Issues");
  }

  async ngOnInit() {
    this.allIssues = await this.issueService.getMyIssues();
    this.tasks = this.allIssues.filter(
      (issue) => issue.getType() === IssueTypeName.TASK
    );
    this.bugs = this.allIssues.filter(
      (issue) => issue.getType() === IssueTypeName.BUG
    );
    this.columnsToDisplayForIssues = columnsToDisplayForIssues;
    this.statusList = statusOptions;
  }

  removeSelectedIssues() {
    const bugsToRemove: Issue[] = this.bugsTable.selection.selected;
    console.log("Removing selected bugs:", bugsToRemove);

    const tasksToRemove: Issue[] = this.tasksTable.selection.selected;
    console.log("Removing selected tasks:", tasksToRemove);

    [...bugsToRemove, ...tasksToRemove].map((issue) =>
      this.issueService.deleteIssue(issue.getId())
    );
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

    dialogRef.componentInstance.save.subscribe((res) => {
      console.log("Closing dialog...");
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
