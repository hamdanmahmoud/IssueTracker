import { Issue } from "./Issue";

export interface Project {
  title: string;
  summary: string;
  id: string;
  owner: string;
  collaborators: string[];
  created: Date;
  issues: Issue[];
}
