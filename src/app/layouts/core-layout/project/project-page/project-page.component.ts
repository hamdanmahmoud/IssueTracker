import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Issue } from "app/models/Issue";
import { Project } from "app/models/Project";
import {
  tasks,
  bugs,
  projectsCreatedByMe,
  collaborations,
  mahmoud,
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log("Project-page");

    this.projectId = this.route.snapshot.paramMap.get("projectId");
    console.log("Project id is", this.projectId);
    this.selectedIssueId = this.route.snapshot.paramMap.get("issueId");

    this.project = [...projectsCreatedByMe, ...collaborations].find(
      (project) => project.id === this.projectId
    );
    console.log("Issues before filtering:", this.issues);
    this.issues = [...bugs, ...tasks].filter(
      (issue) => issue.project === this.project
    );
    console.log("Issues after filtering:", this.issues);

    console.log("Project is", this.project);

    this.route.queryParams.subscribe((params) => {
      this.sortBy = params["sortBy"];
    });

    // TODO: having the criteria, service call logic goes here
    this.issues = this.issues.sort(
      (a, b) => new Date(b.created).valueOf() - new Date(a.created).valueOf()
    );

    switch (this.sortBy) {
      case "urgent":
        this.issues = this.issues.filter((issue) => issue.priority >= 80);
        break;
      case "mine": // TODO: proper look up based on auth service or smth
        this.issues = this.issues.filter((issue) =>
          issue.assignees.includes(mahmoud)
        );
        break;
      case "open":
        this.issues = this.issues.filter(
          (issue) =>
            issue.status !== "RESOLVED" &&
            issue.status !== "CANCELED" &&
            issue.status !== "DONE"
        );
        break;
      default:
        // don't do anything
        break;
    }

    // selection logic

    this.issues.forEach((issue) => (issue.selected = false));

    if (this.selectedIssueId) {
      this.selectedIssue = this.issues.find(
        (issue) => issue.id === this.selectedIssueId
      );
    } else {
      this.selectedIssue = this.issues[0];
      console.log("Else here", this.issues);
    }
    if (this.selectedIssue) {
      // if there is at least one issue
      this.selectedIssue.selected = true;
      this.selectedIssueId = this.selectedIssue.id;
      this.router.navigate(
        ["/projects", this.projectId, "issues", this.selectedIssueId],
        {
          queryParams: { sortBy: this.sortBy },
        }
      );
    }
  }

  selectIssue(issue: Issue): void {
    this.selectedIssue.selected = false;
    this.selectedIssue = issue;
    this.selectedIssue.selected = true;
    this.selectedIssueId = issue.id;

    this.router.navigate(
      ["/projects", this.projectId, "issues", this.selectedIssueId],
      {
        queryParams: { sortBy: this.sortBy },
      }
    );
    console.log("Selected issue id changed to", this.selectedIssueId);
  }
}
