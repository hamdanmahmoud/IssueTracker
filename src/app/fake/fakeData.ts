import { Issue } from "app/models/Issue";
import { IssueStatus } from "app/models/IssueStatus";
import { Project } from "app/models/Project";
import { ProjectCard } from "app/models/ProjectCard";
import { User } from "app/models/User";

const mahmoud: User = new User(
  "4d3944fe-5861-477c-b50a-4eee542667d5",
  "Mahmoud-Tudor",
  "Hamdan",
  "hamdan.mahmoudtudor@gmail.com"
);

const ana: User = new User(
  "dfefdd1f-1975-4795-8f38-dc77a849cc50",
  "Ana-Maria",
  "Tanase",
  "tanase.anamaria97@gmail.com"
);

const hori: User = new User(
  "10204d49-4251-4219-945f-a2f4aaa7dd41",
  "George-Horatiu",
  "Niculae",
  "niculae.georgehoratiu@gmail.com"
);

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
    description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
    pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    reporter: mahmoud,
    assignees: [hori, ana],
    status: "CANCELED",
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    priority: 60,
    type: "task",
    id: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
    selected: false,
  },
  {
    project: "Backend",
    summary: "Summary for this exact exact exact exact exact exact issue",
    description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
      pariatur. Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    reporter: hori,
    assignees: [ana],
    status: "RESOLVED",
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    priority: 40,
    type: "task",
    id: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
    selected: false,
  },
  {
    project: "System design",
    summary: "Summary for this awesome issue",
    description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
    pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    reporter: hori,
    assignees: [mahmoud, ana],
    status: "IN_REVIEW",
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    priority: 90,
    type: "task",
    id: "6108a364-6dbc-421f-a40e-ab3f8886c681",
    selected: false,
  },
  {
    project: "Database configuration",
    summary: "Summary for this issue",
    description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
    pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    reporter: ana,
    assignees: [mahmoud],
    status: "IN_PROGRESS",
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    priority: 30,
    type: "task",
    id: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
    selected: false,
  },
  {
    project: "DevOps Pipeline",
    summary: "Summary for this task",
    description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat.`,
    reporter: mahmoud,
    assignees: [hori],
    status: "DONE",
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    priority: 50,
    type: "task",
    id: "6e545769-f64f-4b4b-8417-f50885752b89",
    selected: false,
  },
];

export const bugs: Issue[] = [
  {
    project: "Frontend",
    summary: "Summary for this particular issue",
    description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
    pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    reporter: hori,
    assignees: [mahmoud, ana],
    status: "PENDING",
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    priority: 80,
    type: "bug",
    id: "4d3944fe-5861-477c-b50a-4eee542667d5",
    selected: false,
  },
  {
    project: "Backend",
    summary: "Summary for this backend issue",
    description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    reporter: mahmoud,
    assignees: [],
    status: "TO_DO",
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    priority: 50,
    type: "bug",
    id: "2e48e03d-c5f4-4596-a201-0e98a38d60e3",
    selected: false,
  },
  {
    project: "System design",
    summary: "Don't forget about db schema",
    description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
    pariatur.`,
    reporter: ana,
    assignees: [mahmoud],
    status: "RESOLVED",
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    priority: 70,
    type: "bug",
    id: "1873b77a-1c61-4a6e-956f-43832fe4c021",
    selected: false,
  },
  {
    project: "Wonderful project",
    summary: "Some very smart summary",
    description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    reporter: ana,
    assignees: [hori, mahmoud],
    status: "IN_REVIEW",
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    priority: 35,
    type: "bug",
    id: "4e7c3eeb-fe7a-4acd-b565-79d0ad73eba9",
    selected: false,
  },
];

export const allIssues: Issue[] = [...tasks, ...bugs];

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
    owner: mahmoud,
    collaborators: [hori, ana],
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    id: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  },
  {
    title: "Backend",
    summary: "Short description for project with title B",
    issues: [],
    owner: mahmoud,
    collaborators: [ana],
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    id: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  },
  {
    title: "System design",
    summary: "Short description",
    issues: [],
    owner: mahmoud,
    collaborators: [],
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    id: "6108a364-6dbc-421f-a40e-ab3f8886c681",
  },
  {
    title: "Database configuration",
    summary: "Another short description for this last project",
    issues: [],
    owner: mahmoud,
    collaborators: [hori],
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    id: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  },
];

export const collaborations: Project[] = [
  {
    title: "IssueTracker",
    summary: "This is the first part of the A project",
    issues: [],
    owner: ana,
    collaborators: [hori, mahmoud],
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    id: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  },
  {
    title: "Scheduler",
    summary: "Short description for project with title B",
    issues: [],
    owner: ana,
    collaborators: [mahmoud],
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    id: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  },
  {
    title: "SystemsCorp",
    summary: "Short description",
    issues: [],
    owner: ana,
    collaborators: [mahmoud, hori],
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    id: "6108a364-6dbc-421f-a40e-ab3f8886c681",
  },
  {
    title: "Client UI Management",
    summary: "Another short description for this last project",
    issues: [],
    owner: hori,
    collaborators: [ana, mahmoud],
    created: new Date(Date.now() + Math.round(Math.random() * 10000)),
    id: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  },
  {
    title: "Creative",
    summary: "Short description for project ",
    issues: [],
    owner: ana,
    collaborators: [mahmoud],
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

export function getIssueById(id: string) {
  return allIssues.find((issue) => issue.id === id);
}
