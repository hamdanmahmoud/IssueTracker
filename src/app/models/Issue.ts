import { Project } from "./Project";
import { TrackerProject } from "./TrackerProject";
import { User } from "./User";

export interface Issue {
  project: TrackerProject;
  summary: string;
  description: string;
  reporter: User;
  assignees: User[];
  status: string;
  created: Date;
  priority: number;
  type: string;
  id: string;
  selected: boolean;
}
