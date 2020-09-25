import { Issue } from "app/models/Issue";
import { IssueStatus } from "app/models/IssueStatus";
import { Project } from "app/models/Project";
import { ProjectCard } from "app/models/ProjectCard";

export const dashboardProjects: ProjectCard[] = [
  {
    title: "Frontend",
    summary: "This is the first part of the A project",
    urgentIssues: 3,
    assignedToMe: 2,
    allOpen: 7,
    id: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  },
  {
    title: "Backend",
    summary: "Short description for project with title B",
    urgentIssues: 2,
    assignedToMe: 2,
    allOpen: 5,
    id: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  },
  {
    title: "System design",
    summary: "Short description",
    urgentIssues: 0,
    assignedToMe: 2,
    allOpen: 4,
    id: "6108a364-6dbc-421f-a40e-ab3f8886c681",
  },
  {
    title: "Database configuration",
    summary: "Another short description for this last project",
    urgentIssues: 0,
    assignedToMe: 2,
    allOpen: 3,
    id: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  },
];

export const tasks: Issue[] = [
  {
    project: "Frontend",
    summary: "Summary for this particular issue",
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
    summary:
      "Summary for this exact exact exact exact exact exact exact exact exact exact issue",
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
    summary: "Summary for this awesome issue",
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
    summary: "Summary for this issue",
    reporter: "dfefdd1f-1975-4795-8f38-dc77a849cc50",
    assignees: ["4d3944fe-5861-477c-b50a-4eee542667d5"],
    status: "PENDING",
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    priority: 30,
    type: "task",
    id: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  },
];

export const bugs: Issue[] = [
  {
    project: "Frontend",
    summary: "Summary for this particular issue",
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

export const columnsToDisplayForIssues: string[] = [
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

export const columnsToDisplayForMyProjects: string[] = [
  "select",
  "title",
  "summary",
  "owner",
  "collaborators",
  "created",
  "edit",
  "remove",
];

export const columnsToDisplayForCollaborations: string[] = [
  "title",
  "summary",
  "owner",
  "collaborators",
  "created",
];

export const statusOptions: IssueStatus[] = [
  IssueStatus.PENDING,
  IssueStatus.TO_DO,
  IssueStatus.IN_PROGRESS,
  IssueStatus.IN_REVIEW,
  IssueStatus.RESOLVED,
  IssueStatus.CANCELED,
  IssueStatus.DONE,
];

export const projectsCreatedByMe: Project[] = [
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

export const collaborations: Project[] = [
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

export const profileDescription: string = `Don't be scared of the truth because we 
need to restart the human 
foundation in truth And I love you like Kanye loves Kanye I love 
Rick Owens’ bed design but the back is...`;

export const profileName: string = "Mahmoud Hamdan";

export const profileTitle: string = "Software engineer";
