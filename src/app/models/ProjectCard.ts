import { mahmoud } from "app/shared/services/fakeData"; // TODO: circular dependency, should be removed anyway cuz it s fake
import { Issue } from "./Issue";
import { Project } from "./Project";
import { TrackerProject } from "./TrackerProject";

const projectCardKeys = [
  // yes this is very lame but it was quick
  "title",
  "summary",
  "id",
  "urgentIssues",
  "allOpen",
  "assignedToMe",
];

export class ProjectCard extends Project {
  urgentIssues: number;
  allOpen: number;
  assignedToMe: number;

  fromProjectToCard(project: TrackerProject): ProjectCard {
    for (const key in project) {
      if (projectCardKeys.includes(key)) {
        this[key] = project[key];
      }
    }
    return this;
  }

  setIssues(issues: Issue[]): ProjectCard {
    issues = issues.filter((issue) => issue.project.getId() === this.getId());

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
