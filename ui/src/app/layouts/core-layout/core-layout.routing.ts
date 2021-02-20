import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { IssuesComponent } from "./issue/issues/issues.component";
import { ProjectsComponent } from "./project/projects/projects.component";
import { CreateProjectComponent } from "./project/create-project/create-project.component";
import { CreateIssueComponent } from "./issue/create-issue/create-issue.component";
import { ProjectPageComponent } from "./project/project-page/project-page.component";
import { IssuePageComponent } from "./issue/issue-page/issue-page.component";

export const CoreLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "issues", component: IssuesComponent },
  {
    path: "projects/create",
    component: CreateProjectComponent,
  },

  {
    path: "projects/:projectId",
    component: ProjectPageComponent,
  },
  {
    path: "projects/:projectId/issues/:issueId",
    component: ProjectPageComponent,
  },
  {
    path: "issues/:id",
    component: IssuePageComponent,
  },
];
