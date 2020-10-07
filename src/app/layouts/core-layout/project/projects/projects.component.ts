import { Component, OnInit } from "@angular/core";
import {
  projectsCreatedByMe,
  collaborations,
  columnsToDisplayForMyProjects,
  columnsToDisplayForCollaborations,
} from "../../../../fake/fakeData";
import { TrackerProject } from "app/models/TrackerProject";
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
}
