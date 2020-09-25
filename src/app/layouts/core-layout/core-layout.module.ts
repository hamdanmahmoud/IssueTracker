import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreLayoutRoutes } from "./core-layout.routing";

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { IssuesTableComponent } from "./issue/issues-table/issues-table.component";
import { ProjectCardComponent } from "./project/project-card/project-card.component";
import { IssuesComponent } from "app/layouts/core-layout/issue/issues/issues.component";
import { ProjectsComponent } from "app/layouts/core-layout/project/projects/projects.component";
import { ProjectsTableComponent } from "app/layouts/core-layout/project/projects-table/projects-table.component";
import { CreateProjectComponent } from "./project/create-project/create-project.component";
import { ProjectDetailsComponent } from "./project/project-details/project-details.component";
import { IssueDetailsComponent } from "./issue/issue-details/issue-details.component";
import { CreateIssueComponent } from "./issue/create-issue/create-issue.component";
import { ProjectPageComponent } from "./project/project-page/project-page.component";
import { IssuePageComponent } from "./issue/issue-page/issue-page.component";
import { MatListModule } from "@angular/material/list";
import { IssueListItems } from "./issue/issue-list-items/issue-list-items.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CoreLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    IssuesTableComponent,
    IssuesComponent,
    ProjectsTableComponent,
    ProjectCardComponent,
    ProjectsComponent,
    CreateProjectComponent,
    ProjectDetailsComponent,
    IssueDetailsComponent,
    CreateIssueComponent,
    ProjectPageComponent,
    IssuePageComponent,
    IssueListItems,
  ],
  exports: [ProjectDetailsComponent, IssueDetailsComponent],
})
export class CoreLayoutModule {}
