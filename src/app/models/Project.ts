import { Issue } from "./Issue";
import { User } from "./User";

export interface Project {
  title: string;
  summary: string;
  id: string;
  owner: User;
  collaborators: User[];
  created: Date;
  issues: Issue[];
}
