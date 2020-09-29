import { Component, OnInit } from "@angular/core";
import { IssueStatus } from "app/models/IssueStatus";
import { Issue } from "../../../../models/Issue";
import {
  allIssues,
  columnsToDisplayForIssues,
  statusOptions,
} from "../../../../fake/fakeData";
@Component({
  selector: "app-issues",
  templateUrl: "./issues.component.html",
  styleUrls: [
    "./issues.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class IssuesComponent implements OnInit {
  tasks: Issue[];
  bugs: Issue[];
  columnsToDisplayForIssues: string[];
  statusList: IssueStatus[];

  constructor() {
    console.log("Issues");
  }

  ngOnInit(): void {
    this.tasks = allIssues.filter((issue) => issue.type === "task");
    this.bugs = allIssues.filter((issue) => issue.type === "bug");
    this.columnsToDisplayForIssues = columnsToDisplayForIssues;
    this.statusList = statusOptions;
  }
}
