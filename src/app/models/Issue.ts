export interface Issue {
  project: string;
  summary: string;
  reporter: string;
  assignees: string[];
  status: string;
  created: Date;
  priority: number;
  type: string;
  id: string;
}
