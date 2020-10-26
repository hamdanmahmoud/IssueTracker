import { Component, OnInit, ViewChild } from "@angular/core";
import {
  projectsCreatedByMe,
  collaborations,
  columnsToDisplayForMyProjects,
  columnsToDisplayForCollaborations,
} from "../../../../shared/services/fakeData";
import { TrackerProject } from "../../../../models/TrackerProject";
import { ProjectsTableComponent } from "../projects-table/projects-table.component";
import { ProjectService } from "app/shared/services/project.service";
import { AuthService } from "app/shared/services/auth.service";
@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: [
    "./projects.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class ProjectsComponent implements OnInit {
  isRemoveButtonEnabled: boolean = true;
  projectsCreatedByMe: TrackerProject[];
  collaborations: TrackerProject[];
  columnsToDisplayForMyProjects: string[];
  columnsToDisplayForCollaborations: string[];
  @ViewChild(ProjectsTableComponent) projectsTable: ProjectsTableComponent;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {
    console.log("Project");
  }

  handleInCollaborationClick(): void {
    this.isRemoveButtonEnabled = false;
  }

  handleCreatedByMeClick(): void {
    this.isRemoveButtonEnabled = true;
  }

  async ngOnInit() {
    const allProjects = await this.projectService.getMyProjects();
    const myUserId = this.authService.getMyUserId();
    this.projectsCreatedByMe = allProjects.filter(
      (project) => project.getOwnerId() === myUserId
    );
    // this.projectsCreatedByMe = projectsCreatedByMe;
    this.collaborations = allProjects.filter(
      (project) => project.getOwnerId() !== myUserId
    );
    console.log("My projects:", this.projectsCreatedByMe);
    console.log("My collabs:", this.collaborations);
    // this.collaborations = collaborations;
    this.columnsToDisplayForMyProjects = columnsToDisplayForMyProjects;
    this.columnsToDisplayForCollaborations = columnsToDisplayForCollaborations;
  }

  removeSelectedProjects() {
    const projectsToRemove: TrackerProject[] = this.projectsTable.selection
      .selected;
    console.log("Removing selected projects:", projectsToRemove);
  }
}
