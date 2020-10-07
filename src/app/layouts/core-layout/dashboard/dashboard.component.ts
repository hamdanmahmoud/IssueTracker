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

    this.columnsToDisplayForIssues = columnsToDisplayForIssues;
    this.removeColumnsFromIssuesTable("select", "edit", "delete");

    this.statusDropdownOptions = statusOptions;
  }

  removeColumnsFromIssuesTable(...columns: string[]): void {
    columns.forEach((column) => {
      this.columnsToDisplayForIssues.splice(
        this.columnsToDisplayForIssues.indexOf(column),
        1
      );
    });
  }
}
