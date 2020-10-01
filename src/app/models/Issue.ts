import { Project } from "./Project";
import { User } from "./User";

export interface Issue {
  project: Project;
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
