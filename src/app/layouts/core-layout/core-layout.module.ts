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
import { ProjectDetailsComponent } from "./project/project-details/project-details.component";

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
    ProjectDetailsComponent,
  ],
})
export class CoreLayoutModule {}
