import { mahmoud } from "app/fake/fakeData"; // TODO: circular dependency, should be removed anyway cuz it s fake
import { Issue } from "./Issue";
import { Project } from "./Project";

const projectCardKeys = [
  // yes this is very lame but it was quick
  "title",
  "summary",
  "id",
  "urgentIssues",
  "allOpen",
  "assignedToMe",
];

export class ProjectCard {
  title: string;
  summary: string;
  id: string;
  urgentIssues: number;
  allOpen: number;
  assignedToMe: number;

  fromProjectToCard(project: Project): ProjectCard {
    for (const key in project) {
      if (projectCardKeys.includes(key)) {
        this[key] = project[key];
      }
    }
    return this;
  }

  setIssues(issues: Issue[]): ProjectCard {
    issues = issues.filter((issue) => issue.project.id === this.id);
    this.urgentIssues = issues.filter((issue) => issue.priority >= 80).length;
    this.allOpen = issues.filter(
      (issue) =>
        issue.status !== "RESOLVED" &&
        issue.status !== "CANCELED" &&
        issue.status !== "DONE"
    ).length;
    this.assignedToMe = issues.filter(
      (issue) => issue.assignees.includes(mahmoud) // TODO: proper way not fake way
    ).length;
    return this;
  }
}
