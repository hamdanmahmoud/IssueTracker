import { User } from "./User";

export interface Issue {
  project: string;
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
