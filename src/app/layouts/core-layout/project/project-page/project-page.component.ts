import { Component, OnInit } from "@angular/core";
import { Issue } from "app/models/Issue";
import { IssueStatus } from "app/models/IssueStatus";
import { tasks, bugs, statusOptions } from "../../../../fake/fakeData";
export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: "app-project-page",
  templateUrl: "./project-page.component.html",
  styleUrls: [
    "./project-page.component.css",
    "../../issue/issues-table/issues-table.component.scss",
    "../../../../../assets/css/argon.css",
  ],
})
export class ProjectPageComponent implements OnInit {
  issues: Issue[];
  displayedIssue: Issue;
  statusList: IssueStatus[];

  constructor() {}

  ngOnInit(): void {
    this.issues = [...bugs, ...tasks, ...bugs, ...tasks, ...bugs];
    this.statusList = statusOptions;
    this.displayedIssue = this.issues[0];
  }
}
