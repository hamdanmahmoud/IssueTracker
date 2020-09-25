import { Component, OnInit } from "@angular/core";
import { Project } from "../../../../models/Project";
import {
  projectsCreatedByMe,
  collaborations,
  columnsToDisplayForMyProjects,
  columnsToDisplayForCollaborations,
} from "../../../../fake/fakeData";
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
  projectsCreatedByMe: Project[];
  collaborations: Project[];
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
