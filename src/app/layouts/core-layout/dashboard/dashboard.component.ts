import { Component, OnInit } from "@angular/core";
import { ProjectCard } from "../../../models/ProjectCard";
import { Issue } from "../../../models/Issue";
import {
  dashboardProjects,
  allIssues,
  columnsToDisplayForIssues,
  statusOptions,
} from "../../../fake/fakeData";
import { IssueStatus } from "app/models/IssueStatus";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  PROJECTS: ProjectCard[];
  tasks: Issue[];
  bugs: Issue[];
  columnsToDisplayForIssues: string[];
  statusList: IssueStatus[];

  constructor() {
    console.log("Dashboard");
  }
  ngOnInit(): void {
    this.PROJECTS = dashboardProjects;
    this.tasks = allIssues.filter((issue) => issue.type === "task");
    this.bugs = allIssues.filter((issue) => issue.type === "bug");
    this.columnsToDisplayForIssues = columnsToDisplayForIssues;
    this.statusList = statusOptions;
  }
}
