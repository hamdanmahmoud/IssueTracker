import { Component, OnInit, ViewChild } from "@angular/core";
import {
  projectsCreatedByMe,
  collaborations,
  columnsToDisplayForMyProjects,
  columnsToDisplayForCollaborations,
} from "../../../../fake/fakeData";
import { TrackerProject } from "app/models/TrackerProject";
import { ProjectsTableComponent } from "../projects-table/projects-table.component";
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

  constructor() {
    console.log("Project");
  }

  handleInCollaborationClick(): void {
    this.isRemoveButtonEnabled = false;
  }

  handleCreatedByMeClick(): void {
    this.isRemoveButtonEnabled = true;
  }

  ngOnInit(): void {
    this.projectsCreatedByMe = projectsCreatedByMe;
    this.collaborations = collaborations;
    this.columnsToDisplayForMyProjects = columnsToDisplayForMyProjects;
    this.columnsToDisplayForCollaborations = columnsToDisplayForCollaborations;
  }

  removeSelectedProjects() {
    const projectsToRemove: TrackerProject[] = this.projectsTable.selection
      .selected;
    console.log("Removing selected projects:", projectsToRemove);
  }
}
