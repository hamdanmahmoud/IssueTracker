import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
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
  { path: "table-list", component: TableListComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "notifications", component: NotificationsComponent },
  {
    path: "projects/create",
    component: CreateProjectComponent,
  },
  {
    path: "issues/create",
    component: CreateIssueComponent,
  },
  {
    path: "projects/:id",
    component: ProjectPageComponent,
  },
  {
    path: "issues/:id",
    component: IssuePageComponent,
  },
];
