import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { IssuesComponent } from "app/layouts/core-layout/issue/issues/issues.component";
import { ProjectsComponent } from "app/layouts/core-layout/project/projects/projects.component";
import { InviteToProjectComponent } from "./project/invite-to-project/invite-to-project.component";
import { ProjectDetailsComponent } from "./project/project-details/project-details.component";

export const CoreLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "issues", component: IssuesComponent },
  { path: "table-list", component: TableListComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "invite", component: InviteToProjectComponent }, // might remove this
  {
    path: "project-details",
    component: ProjectDetailsComponent,
  },
];
