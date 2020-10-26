import { IssueStatus } from "./IssueStatus";
import { Project } from "./Project";
import { TrackerProject } from "./TrackerProject";
import { User } from "./User";

export class Issue {
  private project: TrackerProject;
  private summary: string;
  private description: string;
  private reporter: string;
  private assignees: string[];
  private status:
    | IssueStatus.CANCELED
    | IssueStatus.DONE
    | IssueStatus.IN_PROGRESS
    | IssueStatus.IN_REVIEW
    | IssueStatus.PENDING
    | IssueStatus.RESOLVED
    | IssueStatus.TO_DO;
  private created: Date;
  private priority: number;
  private type: string;
  private id: string;
  private selected: boolean;

  constructor(
    project?,
    summary?,
    description?,
    reporter?,
    assignees?,
    status?,
    created?,
    priority?,
    type?,
    id?,
    selected?
  ) {
    this.id = id;
    this.project = project;
    this.summary = summary;
    this.description = description;
    this.reporter = reporter;
    this.assignees = assignees;
    this.status = status;
    this.created = created;
    this.priority = priority;
    this.type = type;
    this.selected = selected;
  }

  getType() {
    return this.type;
  }

  getAssignees() {
    return this.assignees;
  }

  getId() {
    return this.id;
  }

  getProject() {
    return this.project;
  }

  getPriority() {
    return this.priority;
  }

  getCreated() {
    return this.created;
  }

  getStatus() {
    return this.status;
  }

  getSelected() {
    return this.selected;
  }

  setType(type: string) {
    this.type = type;
  }

  setAssignees(assignees: string[]) {
    this.assignees = assignees;
  }

  setId(id: string) {
    this.id = id;
  }

  setProject(project: TrackerProject) {
    this.project = project;
  }

  setCreated(created: Date) {
    this.created = created;
  }

  setStatus(status: IssueStatus) {
    this.status = status;
  }

  setSelected(selected: boolean) {
    this.selected = selected;
  }
}
