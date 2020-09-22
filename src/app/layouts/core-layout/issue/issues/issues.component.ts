import { Component, OnInit } from "@angular/core";
import { Issue } from "../../../../models/Issue";

@Component({
  selector: "app-issues",
  templateUrl: "./issues.component.html",
  styleUrls: [
    "./issues.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class IssuesComponent implements OnInit {
  quickLinks: string[] = ["first", "second", "third"];
  TASKS: Issue[] = [
    {
      project: "Frontend",
      summary: "Summary for this particular project",
      reporter: "10204d49-4251-4219-945f-a2f4aaa7dd41",
      assignees: [
        "4d3944fe-5861-477c-b50a-4eee542667d5",
        "dfefdd1f-1975-4795-8f38-dc77a849cc50",
      ],
      status: "PENDING",
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      priority: 60,
      type: "task",
      id: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
    },
    {
      project: "Backend",
      summary: "Summary for this exact project",
      reporter: "4d3944fe-5861-477c-b50a-4eee542667d5",
      assignees: ["dfefdd1f-1975-4795-8f38-dc77a849cc50"],
      status: "PENDING",
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      priority: 40,
      type: "task",
      id: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
    },
    {
      project: "System design",
      summary: "Summary for this awesome project",
      reporter: "4d3944fe-5861-477c-b50a-4eee542667d5",
      assignees: [
        "10204d49-4251-4219-945f-a2f4aaa7dd41",
        "dfefdd1f-1975-4795-8f38-dc77a849cc50",
        "4d3944fe-5861-477c-b50a-4eee542667d5",
      ],
      status: "PENDING",
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      priority: 90,
      type: "task",
      id: "6108a364-6dbc-421f-a40e-ab3f8886c681",
    },
    {
      project: "Database configuration",
      summary: "Summary for this project",
      reporter: "dfefdd1f-1975-4795-8f38-dc77a849cc50",
      assignees: ["4d3944fe-5861-477c-b50a-4eee542667d5"],
      status: "PENDING",
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      priority: 30,
      type: "task",
      id: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
    },
  ];

  BUGS: Issue[] = [
    {
      project: "Frontend",
      summary: "Summary for this particular project",
      reporter: "4d3944fe-5861-477c-b50a-4eee542667d5",
      assignees: [
        "dfefdd1f-1975-4795-8f38-dc77a849cc50",
        "10204d49-4251-4219-945f-a2f4aaa7dd41",
      ],
      status: "PENDING",
      created: new Date(Date.now() + Math.round(Math.random() * 10000)),
      priority: 80,
      type: "bug",
      id: "4d3944fe-5861-477c-b50a-4eee542667d5",
    },
  ];

  columnsToDisplayForIssues: string[] = [
    "select",
    "project",
    "summary",
    "reporter",
    "assignees",
    "status",
    "created",
    "priority",
    "edit",
    "remove",
  ];

  statusList: string[] = [
    "PENDING",
    "CANCELED",
    "IN_PROGRESS",
    "RESOLVED",
    "IN_REVIEW",
    "TO_DO",
    "DONE",
  ];

  constructor() {
    console.log("Issues");
  }

  ngOnInit(): void {}
}
