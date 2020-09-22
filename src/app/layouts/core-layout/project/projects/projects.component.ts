import { Component, OnInit } from "@angular/core";
import { Project } from "../../../../models/Project";

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

  projectsCreatedByMe: Project[] = [
    {
      title: "Frontend",
      summary: "This is the first part of the A project",
      issues: [],
      owner: "4d3944fe-5861-477c-b50a-4eee542667d5",
      collaborators: [
        "10204d49-4251-4219-945f-a2f4aaa7dd41",
        "dfefdd1f-1975-4795-8f38-dc77a849cc50",
      ],
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      id: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
    },
    {
      title: "Backend",
      summary: "Short description for project with title B",
      issues: [],
      owner: "4d3944fe-5861-477c-b50a-4eee542667d5",
      collaborators: ["dfefdd1f-1975-4795-8f38-dc77a849cc50"],
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      id: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
    },
    {
      title: "System design",
      summary: "Short description",
      issues: [],
      owner: "4d3944fe-5861-477c-b50a-4eee542667d5",
      collaborators: [],
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      id: "6108a364-6dbc-421f-a40e-ab3f8886c681",
    },
    {
      title: "Database configuration",
      summary: "Another short description for this last project",
      issues: [],
      owner: "4d3944fe-5861-477c-b50a-4eee542667d5",
      collaborators: ["dfefdd1f-1975-4795-8f38-dc77a849cc50"],
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      id: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
    },
  ];

  collaborations: Project[] = [
    {
      title: "IssueTracker",
      summary: "This is the first part of the A project",
      issues: [],
      owner: "dfefdd1f-1975-4795-8f38-dc77a849cc50",
      collaborators: ["4d3944fe-5861-477c-b50a-4eee542667d5"],
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      id: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
    },
    {
      title: "Scheduler",
      summary: "Short description for project with title B",
      issues: [],
      owner: "dfefdd1f-1975-4795-8f38-dc77a849cc50",
      collaborators: ["4d3944fe-5861-477c-b50a-4eee542667d5"],
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      id: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
    },
    {
      title: "SystemsCorp",
      summary: "Short description",
      issues: [],
      owner: "dfefdd1f-1975-4795-8f38-dc77a849cc50",
      collaborators: [
        "10204d49-4251-4219-945f-a2f4aaa7dd41",
        "4d3944fe-5861-477c-b50a-4eee542667d5",
      ],
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      id: "6108a364-6dbc-421f-a40e-ab3f8886c681",
    },
    {
      title: "Client UI Management",
      summary: "Another short description for this last project",
      issues: [],
      owner: "10204d49-4251-4219-945f-a2f4aaa7dd41",
      collaborators: [
        "dfefdd1f-1975-4795-8f38-dc77a849cc50",
        "4d3944fe-5861-477c-b50a-4eee542667d5",
      ],
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      id: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
    },
    {
      title: "Creative",
      summary: "Short description for project ",
      issues: [],
      owner: "dfefdd1f-1975-4795-8f38-dc77a849cc50",
      collaborators: ["4d3944fe-5861-477c-b50a-4eee542667d5"],
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      id: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
    },
  ];

  columnsToDisplayForMyProjects: string[] = [
    "select",
    "title",
    "summary",
    "owner",
    "collaborators",
    "created",
    "edit",
    "remove",
  ];

  columnsToDisplayForCollaborations: string[] = [
    "title",
    "summary",
    "owner",
    "collaborators",
    "created",
  ];

  constructor() {
    console.log("Project");
  }

  handleInCollaborationClick(): void {
    this.isRemoveButtonEnabled = false;
  }

  handleCreatedByMeClick(): void {
    this.isRemoveButtonEnabled = true;
  }

  ngOnInit(): void {}
}
