import { Project } from "./Project";
import { TrackerProject } from "./TrackerProject";
import { User } from "./User";

export class Issue {
  project: TrackerProject;
  summary: string;
  description: string;
  reporter: User;
  assignees: string[];
  status: string;
  created: Date;
  priority: number;
  type: string;
  id: string;
  selected: boolean;

  constructor(project?, summary?, description?, reporter?, assignees?, status?, priority?, type?, id?, selected?) {
    this.id = id;
    this.project = project;
    this.summary = summary;
    this.description = description;
    this.reporter = reporter;
    this.assignees = assignees;
    this.status = status;
    this.priority = priority;
    this.type = type;
    this.selected = selected;
  }
}

