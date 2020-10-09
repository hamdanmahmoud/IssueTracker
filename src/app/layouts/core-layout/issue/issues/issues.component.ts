import { Component, OnInit, ViewChild } from "@angular/core";
import { IssueStatus } from "app/models/IssueStatus";
import { Issue } from "../../../../models/Issue";
import {
  allIssues,
  columnsToDisplayForIssues,
  statusOptions,
} from "../../../../fake/fakeData";
import { IssuesTableComponent } from "../issues-table/issues-table.component";
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
  @ViewChild(IssuesTableComponent) issuesTable: IssuesTableComponent;

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
    const issuesToRemove: Issue[] = this.issuesTable.selection.selected;
    console.log("Removing selected issues:", issuesToRemove);
  }
}
