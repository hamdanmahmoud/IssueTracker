import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Issue } from "../../../../models/Issue";
import { TrackerProject } from "../../../../models/TrackerProject";
import {
  tasks,
  bugs,
  projectsCreatedByMe,
  collaborations,
  mahmoud,
} from "../../../../shared/services/fakeData";
import { CreateRoleComponent } from "../../roles/create-role/create-role.component";
import { ManageRolesOnProjectComponent } from "../../roles/manage-roles-on-project/manage-roles-on-project.component";
import { ManageUsersOnProject } from "../../roles/manage-users-on-project/manage-users-on-project.component";
import { ManageUserRolesComponent } from "../../roles/manage-user-roles/manage-user-roles.component";
import { CreateIssueComponent } from "../../issue/create-issue/create-issue.component";
import { IssueDetailsComponent } from "../../issue/issue-details/issue-details.component";
import { AuthService } from "../../../../shared/services/auth.service";
import { ProjectService } from "app/shared/services/project.service";
import { IssueService } from "app/shared/services/issue.service";

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
  project: TrackerProject;
  issues: Issue[];
  selectedIssue: Issue;
  selectedIssueId: string;
  sortBy: undefined | "open" | "mine" | "urgent";

  @Input()
  allIssues: Issue[];

  @Input()
  allProjects: TrackerProject[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private issueService: IssueService,
    private projectService: ProjectService
  ) {}

  async ngOnInit() {
    console.log("Project-page");

    this.projectId = this.route.snapshot.paramMap.get("projectId");
    console.log("Project id is", this.projectId);

    if (!this.allIssues) {
      // TODO: change this, it should return ALL issues on project, not ALL OWNED issues on project
      this.allIssues = await this.issueService.getIssuesByProject(
        this.projectId
      );
    }

    if (!this.allProjects) {
      this.allProjects = await this.projectService.getMyProjects();
    }

    this.selectedIssueId = this.route.snapshot.paramMap.get("issueId");

    this.project = this.allProjects.find(
      (project) => project.getId() === this.projectId
    );
    console.log("Issues before filtering:", this.issues);
    this.issues = this.allIssues.filter(
      (issue) => issue.getProject().getId() === this.project.getId()
    );
    console.log("Issues after filtering:", this.issues);

    console.log("Project is", this.project);

    this.route.queryParams.subscribe((params) => {
      this.sortBy = params["sortBy"];
    });

    // TODO: having the criteria, service call logic goes here
    this.issues = this.issues.sort(
      (a, b) =>
        new Date(b.getCreated()).valueOf() - new Date(a.getCreated()).valueOf()
    );

    switch (this.sortBy) {
      case "urgent":
        this.issues = this.issues.filter((issue) => issue.getPriority() >= 80);
        break;
      case "mine": // TODO: proper look up based on auth service or smth
        this.issues = this.issues.filter((issue) =>
          issue.getAssignees().includes(this.authService.getMyUserId())
        );
        break;
      case "open":
        this.issues = this.issues.filter(
          (issue) =>
            issue.getStatus() !== "RESOLVED" &&
            issue.getStatus() !== "CANCELED" &&
            issue.getStatus() !== "DONE"
        );
        break;
      default:
        // don't do anything
        break;
    }

    // selection logic

    this.issues.forEach((issue) => issue.setSelected(false));

    if (this.selectedIssueId) {
      this.selectedIssue = this.issues.find(
        (issue) => issue.getId() === this.selectedIssueId
      );
    } else {
      this.selectedIssue = this.issues[0];
      console.log("Else here", this.issues);
    }
    if (this.selectedIssue) {
      // if there is at least one issue
      this.selectedIssue.setSelected(true);
      this.selectedIssueId = this.selectedIssue.getId();
      this.router.navigate(
        ["/projects", this.projectId, "issues", this.selectedIssueId],
        {
          queryParams: { sortBy: this.sortBy },
        }
      );
    }
  }

  selectIssue(issue: Issue): void {
    this.selectedIssue.setSelected(false);
    this.selectedIssue = issue;
    this.selectedIssue.setSelected(true);
    this.selectedIssueId = issue.getId();

    this.router.navigate(
      ["/projects", this.projectId, "issues", this.selectedIssueId],
      {
        queryParams: { sortBy: this.sortBy },
      }
    );
    console.log("Selected issue id changed to", this.selectedIssueId);
  }

  openManageRoles() {
    console.log("Clicked open manage roles");
    const dialogRef = this.dialog.open(ManageRolesOnProjectComponent, {
      width: "20rem",
      height: "auto",
      data: { project: this.project },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  openManageUsers() {
    console.log("Clicked open manage users");
    const dialogRef = this.dialog.open(ManageUsersOnProject, {
      width: "20rem",
      height: "auto",
      maxHeight: "50rem",
      data: { project: this.project },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  openNewIssue() {
    console.log("Clicked open new issue");
    const dialogRef = this.dialog.open(IssueDetailsComponent, {
      width: "25rem",
      height: "auto",
      maxHeight: "70rem",
      data: { project: this.project, action: "create" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
