import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Issue } from "app/models/Issue";
import { Project } from "app/models/Project";
import {
  tasks,
  bugs,
  projectsCreatedByMe,
  collaborations,
} from "../../../../fake/fakeData";

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: "app-project-page",
  templateUrl: "./project-page.component.html",
  styleUrls: [
    "./project-page.component.css",
    "../../dashboard/dashboard.component.css",
    // "../../../../../assets/css/argon.css",
  ],
})
export class ProjectPageComponent implements OnInit {
  projectId: string;
  project: Project;
  issues: Issue[];
  selectedIssue: Issue;
  selectedIssueId: string;
  sortBy: undefined | "open" | "mine" | "urgent";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("Project-page");

    this.projectId = this.route.snapshot.paramMap.get("id");
    this.project = [...projectsCreatedByMe, ...collaborations].find(
      (project) => project.id === this.projectId
    );

    console.log("Project is", this.project);

    this.route.queryParams.subscribe((params) => {
      this.sortBy = params["sortBy"];
    });

    // TODO: having the criteria, service call logic goes here
    this.issues = [...bugs, ...tasks].sort(
      (a, b) => new Date(b.created).valueOf() - new Date(a.created).valueOf()
    );

    // selection logic

    this.issues.forEach((issue) => (issue.selected = false));
    this.selectedIssue = this.issues[0];
    this.selectedIssue.selected = true;
    this.selectedIssueId = this.selectedIssue.id;
  }

  selectIssue(issue: Issue): void {
    this.selectedIssue.selected = false;
    this.selectedIssue = issue;
    this.selectedIssue.selected = true;
    this.selectedIssueId = issue.id;
    console.log("Selected issue id changed to", this.selectedIssueId);
  }
}
