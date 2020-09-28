import { Component, OnInit } from "@angular/core";
import { Issue } from "app/models/Issue";
import { IssueStatus } from "app/models/IssueStatus";
import { tasks, bugs } from "../../../../fake/fakeData";
export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: "app-project-page",
  templateUrl: "./project-page.component.html",
  styleUrls: [
    "./project-page.component.css",
    "../../../../../assets/css/argon.css",
  ],
})
export class ProjectPageComponent implements OnInit {
  issues: Issue[];
  selectedIssue: Issue;

  constructor() {}

  ngOnInit(): void {
    this.issues = [...bugs, ...tasks, ...bugs, ...tasks, ...bugs];
    this.selectedIssue = this.issues[0];
  }
}
