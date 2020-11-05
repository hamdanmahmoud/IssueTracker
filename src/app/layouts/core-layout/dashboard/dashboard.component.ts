import { Component, OnInit } from "@angular/core";
import { ProjectCard } from "../../../models/ProjectCard";
import { Issue } from "../../../models/Issue";
import {
  columnsToDisplayForIssuesInDashboard,
  statusOptions,
} from "../../../shared/services/appData";
import { IssueStatus } from "../../../models/IssueStatus";
import { IssueTypeName } from "../../../models/IssueType";
import { IssueService } from "app/shared/services/issue.service";
import { ProjectService } from "app/shared/services/project.service";

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

  constructor(
    private projectService: ProjectService,
    private issueService: IssueService
  ) {
    console.log("Dashboard");
  }

  async ngOnInit() {
    // this.projectCards = dashboardProjects;
    let myIssues = await this.issueService.getMyIssues();
    console.log("MY ISSUES IN DASHBOARD", myIssues);
    this.tasks = myIssues.filter(
      (issue) => issue.getType() === IssueTypeName.TASK
    );
    this.bugs = myIssues.filter(
      (issue) => issue.getType() === IssueTypeName.BUG
    );

    this.projectCards = await this.projectService.getMyProjectCards();
    console.log(this.projectCards);
    // console.log(dashboardProjects);
    this.columnsToDisplayForIssues = columnsToDisplayForIssuesInDashboard;

    this.statusDropdownOptions = statusOptions;
  }
}
