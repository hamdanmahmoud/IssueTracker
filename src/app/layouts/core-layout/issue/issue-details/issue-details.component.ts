import { Component, Input, OnInit } from "@angular/core";
import { IssueType } from "app/models/IssueType";
import { Project } from "app/models/Project";

@Component({
  selector: "app-issue-details",
  templateUrl: "./issue-details.component.html",
  styleUrls: [
    "./issue-details.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class IssueDetailsComponent implements OnInit {
  @Input()
  action: "create" | "edit";

  projects: Project[] = [
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

  defaultIssueType: IssueType;

  issueTypes: IssueType[] = [
    {
      name: "Bug",
      iconName: "bug_report",
      color: "red",
    },
    {
      name: "Task",
      iconName: "assignment",
      color: "green",
    },
  ];

  constructor() {
    console.log("Issue-details");
  }

  ngOnInit(): void {
    this.defaultIssueType = this.issueTypes[0];

    if (this.action === "create") return;

    // TODO: edit logic goes here, should import existing fields
  }

  compareFn(f1, f2): boolean {
    return f1 && f2 ? f1.name === f2.name : f1 === f2;
  }
}
