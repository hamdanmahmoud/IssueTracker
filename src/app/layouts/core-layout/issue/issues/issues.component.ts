import { Component, OnInit, ViewChild } from "@angular/core";
import { IssueStatus } from "app/models/IssueStatus";
import { Issue } from "../../../../models/Issue";
import {
  allIssues,
  columnsToDisplayForIssues,
  statusOptions,
} from "../../../../fake/fakeData";
import { IssuesTableComponent } from "../issues-table/issues-table.component";
import { SelectionModel } from "@angular/cdk/collections";
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

  constructor() {
    console.log("Issues");
  }

  ngOnInit(): void {
    this.tasks = allIssues.filter((issue) => issue.type === "task");
    this.bugs = allIssues.filter((issue) => issue.type === "bug");
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
}
