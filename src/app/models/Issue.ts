import { Project } from "./Project";
import { TrackerProject } from "./TrackerProject";
import { User } from "./User";

export class Issue {
  projectId: string;
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
}
