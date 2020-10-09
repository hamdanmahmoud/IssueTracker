import { Issue } from "app/models/Issue";
import { IssueStatus } from "app/models/IssueStatus";
import { Permission } from "app/models/Permission";
import { ProjectCard } from "app/models/ProjectCard";
import { Role } from "app/models/Role";
import { TrackerProject } from "app/models/TrackerProject";
import { User } from "app/models/User";

const role1: Role = new Role(
  "debe1e35-274b-406c-8d43-d8903346c2fe",
  "Project-leader",
  "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  [
    Permission.ADD_COMMENTS,
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ]
);

const role2: Role = new Role(
  "30f2d76e-0a7b-43e0-9eb0-e4fa6b4aa90e",
  "Tester",
  "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ]
);

const role3: Role = new Role(
  "8c096ea3-c498-40cc-9d87-1af6ace886d8",
  "Owner",
  "942391a3-3c7a-4bc2-8e26-f59f9c4ded30",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_ISSUES,
    Permission.DELETE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MANAGE_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADMINISTER_ROLES,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
    Permission.DELETE_ALL_COMMENTS,
    Permission.DELETE_OWN_COMMENTS,
    Permission.EDIT_ALL_COMMENTS,
  ]
);

const role4: Role = new Role(
  "d98e1c65-9c6a-4de0-a4d0-101c85afaec4",
  "Developer",
  "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ]
);

const role5: Role = new Role(
  "4195ac93-26df-49ca-8485-f83bc637b647",
  "Software Engineer",
  "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ]
);

const role6: Role = new Role(
  "891a8568-67c2-4943-8c8f-63e3b68927d7",
  "Software developer",
  "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ]
);

const role7: Role = new Role(
  "e3de3f4c-14ad-4e4a-8f13-beac48a062f0",
  "Technical Support",
  "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  [
    Permission.ADD_COMMENTS,
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ]
);

const role8: Role = new Role(
  "7793fdc5-b90f-4d3d-a889-986be91860b0",
  "Project-leader",
  "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  [
    Permission.ADD_COMMENTS,
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ]
);

const role9: Role = new Role(
  "96dc11c4-8393-4c6c-b2af-f977b0647b88",
  "Owner",
  "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_ISSUES,
    Permission.DELETE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MANAGE_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADMINISTER_ROLES,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
    Permission.DELETE_ALL_COMMENTS,
    Permission.DELETE_OWN_COMMENTS,
    Permission.EDIT_ALL_COMMENTS,
  ]
);

const role10: Role = new Role(
  "8f9ed920-276f-4b2c-b1ea-5066dc6e1eb2",
  "Owner",
  "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_ISSUES,
    Permission.DELETE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MANAGE_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADMINISTER_ROLES,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
    Permission.DELETE_ALL_COMMENTS,
    Permission.DELETE_OWN_COMMENTS,
    Permission.EDIT_ALL_COMMENTS,
  ]
);

const role11: Role = new Role(
  "112c96f0-b314-4d93-a063-0322a3c05e85",
  "Owner",
  "6108a364-6dbc-421f-a40e-ab3f8886c681",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_ISSUES,
    Permission.DELETE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MANAGE_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADMINISTER_ROLES,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
    Permission.DELETE_ALL_COMMENTS,
    Permission.DELETE_OWN_COMMENTS,
    Permission.EDIT_ALL_COMMENTS,
  ]
);

const role12: Role = new Role(
  "1192a85e-1589-4777-b48b-59f83c571f3a",
  "Owner",
  "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_ISSUES,
    Permission.DELETE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MANAGE_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADMINISTER_ROLES,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
    Permission.DELETE_ALL_COMMENTS,
    Permission.DELETE_OWN_COMMENTS,
    Permission.EDIT_ALL_COMMENTS,
  ]
);

const role14: Role = new Role(
  "9443fd23-6ed9-46f2-9b8e-c6e299116102",
  "Owner",
  "62c5ad7c-6e00-48e9-b3d9-f14e13d41a07",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_ISSUES,
    Permission.DELETE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MANAGE_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADMINISTER_ROLES,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
    Permission.DELETE_ALL_COMMENTS,
    Permission.DELETE_OWN_COMMENTS,
    Permission.EDIT_ALL_COMMENTS,
  ]
);

const role15: Role = new Role(
  "127ae0d2-b7bc-4d6f-85b4-dbdd506a06a2",
  "Owner",
  "2a559dac-c269-48cc-9ec6-539a4c260f73",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_ISSUES,
    Permission.DELETE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MANAGE_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADMINISTER_ROLES,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
    Permission.DELETE_ALL_COMMENTS,
    Permission.DELETE_OWN_COMMENTS,
    Permission.EDIT_ALL_COMMENTS,
  ]
);

const role16: Role = new Role(
  "872568ce-8dc1-4afa-9982-0f9e14524a2e",
  "Owner",
  "ea23bf00-a45d-43db-963f-fc161891845f",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_ISSUES,
    Permission.DELETE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MANAGE_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADMINISTER_ROLES,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
    Permission.DELETE_ALL_COMMENTS,
    Permission.DELETE_OWN_COMMENTS,
    Permission.EDIT_ALL_COMMENTS,
  ]
);

const role20: Role = new Role(
  "e0bbcb91-533d-4601-853f-dde9e478d546",
  "Technician",
  "ea23bf00-a45d-43db-963f-fc161891845f",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ]
);

const role21: Role = new Role(
  "08e2dd33-040c-4e83-93c5-21c05f6edac3",
  "IT Support",
  "ea23bf00-a45d-43db-963f-fc161891845f",
  [
    Permission.ADD_COMMENTS,
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ]
);

const role17: Role = new Role(
  "558d9a74-4901-402d-a4b6-1b6990756dc3",
  "Owner",
  "55623385-be29-4998-b45e-3c5340e12019",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_ISSUES,
    Permission.DELETE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MANAGE_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADMINISTER_ROLES,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
    Permission.DELETE_ALL_COMMENTS,
    Permission.DELETE_OWN_COMMENTS,
    Permission.EDIT_ALL_COMMENTS,
  ]
);

const role24: Role = new Role(
  "b8780d99-5cb6-46d6-a404-9c5035ff4a97",
  "Manager",
  "55623385-be29-4998-b45e-3c5340e12019",
  [
    Permission.ADD_COMMENTS,
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.DELETE_ALL_COMMENTS,
    Permission.EDIT_ALL_COMMENTS,
  ]
);

const role22: Role = new Role(
  "558d9a74-4901-402d-a4b6-1b6990756dc3",
  "Developer",
  "4eb1fe83-2994-4cb9-b188-ae33f8a711a4",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ]
);

const role18: Role = new Role(
  "f4999ca8-0fe1-46cc-bdb1-ee96749a9f92",
  "Software developer",
  "62c5ad7c-6e00-48e9-b3d9-f14e13d41a07",
  [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ]
);

const role19: Role = new Role(
  "ad506121-cc00-469e-87dd-590622d9b591",
  "Technician",
  "2a559dac-c269-48cc-9ec6-539a4c260f73",
  [
    Permission.ADD_COMMENTS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ]
);

const role23: Role = new Role(
  "76667f26-0a36-4a29-b126-7d53dc487816",
  "IT Support",
  "942391a3-3c7a-4bc2-8e26-f59f9c4ded30",
  [
    Permission.ADD_COMMENTS,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ]
);

export const mahmoud: User = new User(
  "4d3944fe-5861-477c-b50a-4eee542667d5",
  "Mahmoud-Tudor",
  "Hamdan",
  "hamdan.mahmoudtudor@gmail.com",
  "https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg",
  [
    role9,
    role10,
    role11,
    role12,
    role18,
    role19,
    role21,
    role22,
    role23,
    role24,
  ]
);

export const ana: User = new User(
  "dfefdd1f-1975-4795-8f38-dc77a849cc50",
  "Ana-Maria",
  "Tanase",
  "tanase.anamaria97@gmail.com",
  "https://resilientblog.co/wp-content/uploads/2019/07/sky-quotes.jpg",
  [role2, role3, role5, role6, role7, role14, role15, role17, role20]
);

export const hori: User = new User(
  "10204d49-4251-4219-945f-a2f4aaa7dd41",
  "George-Horatiu",
  "Niculae",
  "niculae.georgehoratiu@gmail.com",
  "https://images.unsplash.com/photo-1505051508008-923feaf90180?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
  [role1, role4, role8, role16, role19, role23]
);

export const project1: TrackerProject = new TrackerProject(
  "Frontend",
  "This is the first part of the A project",
  mahmoud,
  [hori, ana],
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  [],
  "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  [role1, role6, role9]
);

export const project2: TrackerProject = new TrackerProject(
  "Backend",
  "Short description for project with title B",
  mahmoud,
  [ana],
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  [],
  "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  [role2, role5, role7, role10]
);

export const project3: TrackerProject = new TrackerProject(
  "System design",
  "Short description",
  mahmoud,
  [],
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  [],
  "6108a364-6dbc-421f-a40e-ab3f8886c681",
  [role11]
);

export const project4: TrackerProject = new TrackerProject(
  "Database configuration",
  "Another short description for this last project",
  mahmoud,
  [hori],
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  [],
  "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  [role4, role8, role12]
);

export const collab1: TrackerProject = new TrackerProject(
  "IssueTracker",
  "This is the first part of the A project",
  ana,
  [hori, mahmoud],
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  [],
  "942391a3-3c7a-4bc2-8e26-f59f9c4ded30",
  [role3, role23]
);

export const collab2: TrackerProject = new TrackerProject(
  "Scheduler",
  "Short description for project with title B",
  ana,
  [mahmoud],
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  [],
  "62c5ad7c-6e00-48e9-b3d9-f14e13d41a07",
  [role14, role18]
);

export const collab3: TrackerProject = new TrackerProject(
  "SystemsCorp",
  "Short description",
  ana,
  [mahmoud, hori],
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  [],
  "2a559dac-c269-48cc-9ec6-539a4c260f73",
  [role15, role19]
);

export const collab4: TrackerProject = new TrackerProject(
  "Client UI Management",
  "Another short description for this last project",
  hori,
  [ana, mahmoud],
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  [],
  "ea23bf00-a45d-43db-963f-fc161891845f",
  [role16, role20, role21]
);

export const collab5: TrackerProject = new TrackerProject(
  "Creative",
  "Short description for project ",
  ana,
  [mahmoud],
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  [],
  "55623385-be29-4998-b45e-3c5340e12019",
  [role17, role24]
);

const task1: Issue = {
  project: project1,
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
  id: "8ebd608e-c11a-4692-b885-9ba57962a526",
  selected: false,
};

const task2: Issue = {
  project: project4,
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
  id: "86139ecf-996c-4e93-b3e1-9303af6df8b0",
  selected: false,
};

const task3: Issue = {
  project: project3,
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
  id: "dc88cb41-656e-49ee-bfa2-e6b45fca5236",
  selected: false,
};

const task4: Issue = {
  project: project2,
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
  id: "1e3ad2cd-15ba-4e88-bf31-29de2e116474",
  selected: false,
};

const task5: Issue = {
  project: project4,
  summary: "Some very smart summary",
  description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  reporter: ana,
  assignees: [hori, mahmoud],
  status: "IN_REVIEW",
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  priority: 45,
  type: "task",
  id: "6a5c48e5-b5ae-4bbc-90bf-d304d7fc746d",
  selected: false,
};

const task6: Issue = {
  project: collab5,
  summary: "Another summary here",
  description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam.`,
  reporter: hori,
  assignees: [mahmoud],
  status: "PENDING",
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  priority: 55,
  type: "task",
  id: "3fbb8319-61c8-413d-8778-8dce95fc47ae",
  selected: false,
};

const task7: Issue = {
  project: collab5,
  summary: "Summary for this issue",
  description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam.`,
  reporter: mahmoud,
  assignees: [ana, hori],
  status: "RESOLVED",
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  priority: 60,
  type: "task",
  id: "78c0014a-fd2f-411c-af98-3d574e4845df",
  selected: false,
};

const task8: Issue = {
  project: collab5,
  summary: "Summary for this task",
  description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  reporter: ana,
  assignees: [mahmoud, hori],
  status: "TO_DO",
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  priority: 20,
  type: "task",
  id: "c2bfee57-6262-4b11-976a-1111c203b62e",
  selected: false,
};

const task9: Issue = {
  project: collab3,
  summary: "Summary for this issue right here.",
  description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  reporter: mahmoud,
  assignees: [ana, hori],
  status: "DONE",
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  priority: 30,
  type: "task",
  id: "86501f3c-856e-4938-8f74-6d95ab33b8f9",
  selected: false,
};

export const tasks: Issue[] = [
  task1,
  task2,
  task3,
  task4,
  task5,
  task6,
  task7,
  task8,
  task9,
];

const bug1: Issue = {
  project: project1,
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
};

const bug2: Issue = {
  project: project2,
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
};

const bug3: Issue = {
  project: project3,
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
};

const bug4: Issue = {
  project: collab2,
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
};

const bug5: Issue = {
  project: collab1,
  summary: "Some very smart summary for this bug",
  description: `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  reporter: ana,
  assignees: [hori, mahmoud],
  status: "CANCELED",
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  priority: 70,
  type: "bug",
  id: "320c739e-025a-46e5-905d-5c2f0013286c",
  selected: false,
};

export const bugs: Issue[] = [bug1, bug2, bug3, bug4, bug5];

export const allIssues: Issue[] = [...tasks, ...bugs];

export const columnsToDisplayForIssuesInDashboard: string[] = [
  "project",
  "summary",
  "reporter",
  "assignees",
  "status",
  "created",
  "priority",
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
  "remove",
];

export const columnsToDisplayForCollaborations: string[] = [
  "title",
  "summary",
  "owner",
  "collaborators",
  "created",
];

export const allPermissions: Permission[] = [
  Permission.ADD_COMMENTS,
  Permission.ADMINISTER_ROLES,
  Permission.ASSIGN_ISSUES,
  Permission.CANCEL_ISSUES,
  Permission.CLOSE_ISSUES,
  Permission.CREATE_ISSUES,
  Permission.DELETE_ALL_COMMENTS,
  Permission.DELETE_ISSUES,
  Permission.DELETE_OWN_COMMENTS,
  Permission.EDIT_ALL_COMMENTS,
  Permission.EDIT_ISSUES,
  Permission.EDIT_OWN_COMMENTS,
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

export const projectsCreatedByMe: TrackerProject[] = [
  project1,
  project2,
  project3,
  project4,
];

export const collaborations: TrackerProject[] = [
  collab1,
  collab2,
  collab3,
  collab4,
  collab5,
];

export const allProjects: TrackerProject[] = [
  ...projectsCreatedByMe,
  ...collaborations,
];

export const dashboardProjects: ProjectCard[] = allProjects
  .map((project) => {
    return new ProjectCard().fromProjectToCard(project);
  })
  .map((project) => {
    return project.setIssues(allIssues);
  })
  .filter(
    (project) => project.assignedToMe || project.urgentIssues || project.allOpen
  );

export const getRolesOfProjectById = (projectId: string): Role[] => {
  return allProjects
    .find((project) => project.getId() === projectId)
    .getRoles();
};

export const getUsersOfProjectById = (projectId: string): User[] => {
  console.log(allProjects.find((project) => project.getId() === projectId));
  return allProjects
    .find((project) => project.getId() === projectId)
    .getCollaborators();
};

export const profileDescription: string = `Don't be scared of the truth because we 
need to restart the human 
foundation in truth And I love you like Kanye loves Kanye I love 
Rick Owens’ bed design but the back is...`;

export const profileName: string = "Mahmoud Hamdan";

export const profileTitle: string = "Software engineer";

export function getIssueById(id: string) {
  return allIssues.find((issue) => issue.id === id);
}
