import { Component, OnInit } from "@angular/core";
import { ProjectCard } from "../../../models/ProjectCard";
import { Issue } from "../../../models/Issue";
import {
  dashboardProjects,
  allIssues,
  columnsToDisplayForIssuesInDashboard,
  statusOptions,
} from "../../../fake/fakeData";
import { IssueStatus } from "app/models/IssueStatus";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  projectCards: ProjectCard[];
  tasks: Issue[];
  bugs: Issue[];
  statusDropdownOptions: IssueStatus[];
  columnsToDisplayForIssues: string[];

  constructor() {
    console.log("Dashboard");
  }

  ngOnInit(): void {
    this.projectCards = dashboardProjects;
    console.log(dashboardProjects);
    console.log(this.projectCards);
    this.tasks = allIssues.filter((issue) => issue.type === "task");
    this.bugs = allIssues.filter((issue) => issue.type === "bug");

    this.columnsToDisplayForIssues = columnsToDisplayForIssuesInDashboard;

    this.statusDropdownOptions = statusOptions;
  }
}
