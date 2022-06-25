import { IssueStatus } from "./IssueStatus";
import { IssueTypeName } from "./IssueType";
import { TrackerProject } from "./TrackerProject";

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
  private progress: number;
  private type: IssueTypeName.BUG | IssueTypeName.TASK;
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
    progress?,
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
    this.progress = progress;
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

  getSummary() {
    return this.summary;
  }

  getProgress() {
    return this.progress;
  }

  getDescription() {
    return this.description;
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

  getReporter() {
    return this.reporter;
  }

  setType(issueType: IssueTypeName.BUG | IssueTypeName.TASK) {
    this.type = issueType;
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

  setProgress(progress: number) {
    this.progress = progress;
  }

  setStatus(status: IssueStatus) {
    this.status = status;
  }

  setSelected(selected: boolean) {
    this.selected = selected;
  }

  setSummary(summary: string) {
    this.summary = summary;
  }

  setDescription(description: string) {
    this.description = description;
  }
}
