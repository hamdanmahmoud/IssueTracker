import { Component, OnInit } from "@angular/core";
import { IssueStatus } from "app/models/IssueStatus";
import { Issue } from "../../../../models/Issue";
import {
  tasks,
  bugs,
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
  TASKS: Issue[];
  BUGS: Issue[];
  columnsToDisplayForIssues: string[];
  statusList: IssueStatus[];

  constructor() {
    console.log("Issues");
  }

  ngOnInit(): void {
    this.TASKS = tasks;
    this.BUGS = bugs;
    this.columnsToDisplayForIssues = columnsToDisplayForIssues;
    this.statusList = statusOptions;
  }
}
