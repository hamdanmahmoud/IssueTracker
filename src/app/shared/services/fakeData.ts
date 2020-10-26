import { Issue } from "../../models/Issue";
import { IssueStatus } from "../../models/IssueStatus";
import { Permission } from "../../models/Permission";
import { ProjectCard } from "../../models/ProjectCard";
import { Role } from "../../models/Role";
import { TrackerProject } from "../../models/TrackerProject";
import { User } from "../../models/User";

const role1: Role = Object.assign(new Role(), {
  id: "debe1e35-274b-406c-8d43-d8903346c2fe",
  name: "Project-leader",
  projectId: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  permissions: [
    Permission.ADD_COMMENTS,
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ],
});

const role2: Role = Object.assign(new Role(), {
  id: "30f2d76e-0a7b-43e0-9eb0-e4fa6b4aa90e",
  name: "Tester",
  projectId: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  permissions: [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ],
});

const role3: Role = Object.assign(new Role(), {
  id: "8c096ea3-c498-40cc-9d87-1af6ace886d8",
  name: "Owner",
  projectId: "942391a3-3c7a-4bc2-8e26-f59f9c4ded30",
  permissions: [
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
  ],
});

const role4: Role = Object.assign(new Role(), {
  id: "d98e1c65-9c6a-4de0-a4d0-101c85afaec4",
  name: "Developer",
  projectId: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  permissions: [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ],
});

const role5: Role = Object.assign(new Role(), {
  id: "4195ac93-26df-49ca-8485-f83bc637b647",
  name: "Software Engineer",
  projectId: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  permissions: [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ],
});

const role6: Role = Object.assign(new Role(), {
  id: "891a8568-67c2-4943-8c8f-63e3b68927d7",
  name: "Software developer",
  projectId: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  permissions: [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ],
});

const role7: Role = Object.assign(new Role(), {
  id: "e3de3f4c-14ad-4e4a-8f13-beac48a062f0",
  name: "Technical Support",
  projectId: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  permissions: [
    Permission.ADD_COMMENTS,
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ],
});

const role8: Role = Object.assign(new Role(), {
  id: "7793fdc5-b90f-4d3d-a889-986be91860b0",
  name: "Project-leader",
  projectId: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  permissions: [
    Permission.ADD_COMMENTS,
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ],
});

const role9: Role = Object.assign(new Role(), {
  id: "96dc11c4-8393-4c6c-b2af-f977b0647b88",
  name: "Owner",
  projectId: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  permissions: [
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
  ],
});

const role10: Role = Object.assign(new Role(), {
  id: "8f9ed920-276f-4b2c-b1ea-5066dc6e1eb2",
  name: "Owner",
  projectId: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  permissions: [
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
  ],
});

const role11: Role = Object.assign(new Role(), {
  id: "112c96f0-b314-4d93-a063-0322a3c05e85",
  name: "Owner",
  projectId: "6108a364-6dbc-421f-a40e-ab3f8886c681",
  permissions: [
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
  ],
});

const role12: Role = Object.assign(new Role(), {
  id: "1192a85e-1589-4777-b48b-59f83c571f3a",
  name: "Owner",
  projectId: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  permissions: [
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
  ],
});

const role14: Role = Object.assign(new Role(), {
  id: "9443fd23-6ed9-46f2-9b8e-c6e299116102",
  name: "Owner",
  projectId: "62c5ad7c-6e00-48e9-b3d9-f14e13d41a07",
  permissions: [
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
  ],
});

const role15: Role = Object.assign(new Role(), {
  id: "127ae0d2-b7bc-4d6f-85b4-dbdd506a06a2",
  name: "Owner",
  projectId: "2a559dac-c269-48cc-9ec6-539a4c260f73",
  permissions: [
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
  ],
});

const role16: Role = Object.assign(new Role(), {
  id: "872568ce-8dc1-4afa-9982-0f9e14524a2e",
  name: "Owner",
  projectId: "ea23bf00-a45d-43db-963f-fc161891845f",
  permissions: [
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
  ],
});

const role20: Role = Object.assign(new Role(), {
  id: "e0bbcb91-533d-4601-853f-dde9e478d546",
  name: "Technician",
  projectId: "ea23bf00-a45d-43db-963f-fc161891845f",
  permissions: [
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
  ],
});

const role21: Role = Object.assign(new Role(), {
  id: "08e2dd33-040c-4e83-93c5-21c05f6edac3",
  name: "IT Support",
  projectId: "ea23bf00-a45d-43db-963f-fc161891845f",
  permissions: [
    Permission.ADD_COMMENTS,
    Permission.ASSIGN_ISSUES,
    Permission.CANCEL_ISSUES,
    Permission.CLOSE_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ],
});

const role17: Role = Object.assign(new Role(), {
  id: "558d9a74-4901-402d-a4b6-1b6990756dc3",
  name: "Owner",
  projectId: "55623385-be29-4998-b45e-3c5340e12019",
  permissions: [
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
  ],
});

const role24: Role = Object.assign(new Role(), {
  id: "b8780d99-5cb6-46d6-a404-9c5035ff4a97",
  name: "Manager",
  projectId: "55623385-be29-4998-b45e-3c5340e12019",
  permissions: [
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
  ],
});

const role22: Role = Object.assign(new Role(), {
  id: "558d9a74-4901-402d-a4b6-1b6990756dc3",
  name: "Developer",
  projectId: "4eb1fe83-2994-4cb9-b188-ae33f8a711a4",
  permissions: [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ],
});

const role18: Role = Object.assign(new Role(), {
  id: "f4999ca8-0fe1-46cc-bdb1-ee96749a9f92",
  name: "Software developer",
  projectId: "62c5ad7c-6e00-48e9-b3d9-f14e13d41a07",
  permissions: [
    Permission.ASSIGN_ISSUES,
    Permission.CREATE_ISSUES,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
    Permission.ADD_COMMENTS,
    Permission.EDIT_OWN_COMMENTS,
  ],
});

const role19: Role = Object.assign(new Role(), {
  id: "ad506121-cc00-469e-87dd-590622d9b591",
  name: "Technician",
  projectId: "2a559dac-c269-48cc-9ec6-539a4c260f73",
  permissions: [
    Permission.ADD_COMMENTS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ],
});

const role23: Role = Object.assign(new Role(), {
  id: "76667f26-0a36-4a29-b126-7d53dc487816",
  name: "IT Support",
  projectId: "942391a3-3c7a-4bc2-8e26-f59f9c4ded30",
  permissions: [
    Permission.ADD_COMMENTS,
    Permission.CREATE_ISSUES,
    Permission.EDIT_OWN_COMMENTS,
    Permission.UPDATE_ISSUES_STATUS,
    Permission.VIEW_WATCHERS,
    Permission.MARK_ISSUES_FOR_CLOSURE,
  ],
});

export const mahmoud: User = Object.assign(new User(), {
  id: "4d3944fe-5861-477c-b50a-4eee542667d5",
  firstName: "Mahmoud-Tudor",
  lastName: "Hamdan",
  mail: "hamdan.mahmoudtudor@gmail.com",
  imageUrl:
    "https://user-images.githubusercontent.com/37018010/95596121-aca62680-0a55-11eb-802f-0a44c8700ee0.jpg",
  roles: [
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
  ],
});

export const ana: User = Object.assign(new User(), {
  id: "dfefdd1f-1975-4795-8f38-dc77a849cc50",
  firstName: "Ana-Maria",
  lastName: "Tanase",
  mail: "tanase.anamaria97@gmail.com",
  imageUrl:
    "https://user-images.githubusercontent.com/37018010/95596171-b92a7f00-0a55-11eb-9d1c-635f2b8fcf33.jpg",
  roles: [role2, role3, role5, role6, role7, role14, role15, role17, role20],
});

export const hori: User = Object.assign(new User(), {
  id: "10204d49-4251-4219-945f-a2f4aaa7dd41",
  firstName: "George-Horatiu",
  lastName: "Niculae",
  mail: "niculae.georgehoratiu@gmail.com",
  imageUrl:
    "https://user-images.githubusercontent.com/37018010/95596209-c34c7d80-0a55-11eb-9634-717904125dd2.jpg",
  roles: [role1, role4, role8, role16, role19, role23],
});

export const project1: TrackerProject = Object.assign(new TrackerProject(), {
  title: "Frontend",
  summary: "This is the first part of the A project",
  owner: mahmoud,
  collaborators: [hori, ana],
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  id: "9c7e86b2-b9dc-4a62-9229-d17c774d0460",
  roles: [role1, role6, role9],
});

export const project2: TrackerProject = Object.assign(new TrackerProject(), {
  title: "Backend",
  summary: "Short description for project with title B",
  owner: mahmoud,
  collaborators: [ana],
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  id: "6f6b9331-b0e1-4ce3-845c-329897a7ca5e",
  roles: [role2, role5, role7, role10],
});

export const project3: TrackerProject = Object.assign(new TrackerProject(), {
  title: "System design",
  summary: "Short description",
  owner: mahmoud,
  collaborators: [mahmoud, ana],
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  id: "6108a364-6dbc-421f-a40e-ab3f8886c681",
  roles: [role11],
});

export const project4: TrackerProject = Object.assign(new TrackerProject(), {
  title: "Database configuration",
  summary: "Another short description for this last project",
  owner: mahmoud,
  collaborators: [hori, ana],
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  id: "d77de362-7804-4e9d-9b7c-ea338e80ec69",
  roles: [role4, role8, role12],
});

export const collab1: TrackerProject = Object.assign(new TrackerProject(), {
  title: "IssueTracker",
  summary: "This is the first part of the A project",
  owner: ana,
  collaborators: [hori, mahmoud],
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  id: "942391a3-3c7a-4bc2-8e26-f59f9c4ded30",
  roles: [role3, role23],
});

export const collab2: TrackerProject = Object.assign(new TrackerProject(), {
  title: "Scheduler",
  summary: "Short description for project with title B",
  owner: ana,
  collaborators: [mahmoud, hori],
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  id: "62c5ad7c-6e00-48e9-b3d9-f14e13d41a07",
  roles: [role14, role18],
});

export const collab3: TrackerProject = Object.assign(new TrackerProject(), {
  title: "SystemsCorp",
  summary: "Short description",
  owner: ana,
  collaborators: [mahmoud, hori],
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  id: "2a559dac-c269-48cc-9ec6-539a4c260f73",
  roles: [role15, role19],
});

export const collab4: TrackerProject = Object.assign(new TrackerProject(), {
  title: "Client UI Management",
  summary: "Another short description for this last project",
  owner: hori,
  collaborators: [ana, mahmoud],
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  id: "ea23bf00-a45d-43db-963f-fc161891845f",
  roles: [role16, role20, role21],
});

export const collab5: TrackerProject = Object.assign(new TrackerProject(), {
  title: "Creative",
  summary: "Short description for project ",
  owner: ana,
  collaborators: [mahmoud, hori],
  created: new Date(Date.now() + Math.round(Math.random() * 10000)),
  id: "55623385-be29-4998-b45e-3c5340e12019",
  roles: [role17, role24],
});

const task1: Issue = new Issue(
  project1,
  "Summary for this particular issue",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
  pariatur. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  mahmoud.getId(),
  [hori.getId(), ana.getId()],
  IssueStatus.CANCELED,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  60,
  "task",
  "8ebd608e-c11a-4692-b885-9ba57962a526",
  false
);

const task2: Issue = new Issue(
  project4,
  "Summary for this exact exact exact exact exact exact issue",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
  pariatur. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  hori.getId(),
  [ana.getId()],
  IssueStatus.RESOLVED,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  40,
  "task",
  "86139ecf-996c-4e93-b3e1-9303af6df8b0",
  false
);

const task3: Issue = new Issue(
  project3,
  "Summary for this awesome issue",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
  pariatur. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  hori,
  [mahmoud.getId(), ana.getId()],
  IssueStatus.IN_REVIEW,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  90,
  "task",
  "dc88cb41-656e-49ee-bfa2-e6b45fca5236",
  false
);

const task4: Issue = new Issue(
  project2,
  "Summary for this issue",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
  pariatur. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ana.getId(),
  [mahmoud.getId()],
  IssueStatus.IN_PROGRESS,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  30,
  "task",
  "1e3ad2cd-15ba-4e88-bf31-29de2e116474",
  false
);

const task5: Issue = new Issue(
  project4,
  "Some very smart summary",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ana.getId(),
  [hori.getId(), mahmoud.getId()],
  IssueStatus.IN_REVIEW,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  45,
  "task",
  "6a5c48e5-b5ae-4bbc-90bf-d304d7fc746d",
  false
);

const task6: Issue = new Issue(
  collab5,
  "Another summary here",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam.`,
  hori.getId(),
  [mahmoud.getId()],
  IssueStatus.PENDING,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  55,
  "task",
  "3fbb8319-61c8-413d-8778-8dce95fc47ae",
  false
);

const task7: Issue = new Issue(
  collab5,
  "Summary for this issue",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam.`,
  mahmoud.getId(),
  [ana.getId(), hori.getId()],
  IssueStatus.RESOLVED,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  60,
  "task",
  "78c0014a-fd2f-411c-af98-3d574e4845df",
  false
);

const task8: Issue = new Issue(
  collab5,
  "Summary for this task",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ana,
  [mahmoud.getId(), hori.getId()],
  IssueStatus.TO_DO,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  20,
  "task",
  "c2bfee57-6262-4b11-976a-1111c203b62e",
  false
);

const task9: Issue = new Issue(
  collab3,
  "Summary for this issue right here.",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  mahmoud.getId(),
  [ana.getId(), hori.getId()],
  IssueStatus.DONE,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  30,
  "task",
  "86501f3c-856e-4938-8f74-6d95ab33b8f9",
  false
);

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

const bug1: Issue = new Issue(
  project1,
  "Summary for this particular issue",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
  pariatur. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  hori.getId(),
  [mahmoud.getId(), ana.getId()],
  IssueStatus.PENDING,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  80,
  "bug",
  "4d3944fe-5861-477c-b50a-4eee542667d5",
  false
);

const bug2: Issue = new Issue(
  project2,
  "Summary for this backend issue",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  mahmoud.getId(),
  [],
  IssueStatus.TO_DO,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  50,
  "bug",
  "2e48e03d-c5f4-4596-a201-0e98a38d60e3",
  false
);

const bug3: Issue = new Issue(
  project3,
  "Don't forget about db schema",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
  pariatur.`,
  ana.getId(),
  [mahmoud.getId()],
  IssueStatus.RESOLVED,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  70,
  "bug",
  "1873b77a-1c61-4a6e-956f-43832fe4c021",
  false
);

const bug4: Issue = new Issue(
  collab2,
  "Some very smart summary",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ana.getId(),
  [hori.getId(), mahmoud.getId()],
  IssueStatus.IN_REVIEW,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  35,
  "bug",
  "4e7c3eeb-fe7a-4acd-b565-79d0ad73eba9",
  false
);

const bug5: Issue = new Issue(
  collab1,
  "Some very smart summary for this bug",
  `Lorem ipsum dolor sit amet,consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam. Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  ana.getId(),
  [hori.getId(), mahmoud.getId()],
  IssueStatus.CANCELED,
  new Date(Date.now() + Math.round(Math.random() * 10000)),
  70,
  "bug",
  "320c739e-025a-46e5-905d-5c2f0013286c",
  false
);

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

// export const dashboardProjects: ProjectCard[] = allProjects
//   .map((project) => {
//     return new ProjectCard().fromProjectToCard(project);
//   })
//   .map((project) => {
//     return project.setIssues(allIssues);
//   })
//   .filter(
//     (project) => project.assignedToMe || project.urgentIssues || project.allOpen
//   );

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
  return allIssues.find((issue) => issue.getId() === id);
}
