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
    console.log(project);
    for (const key in project) {
      if (projectCardKeys.includes(key)) {
        this[key] = project[key];
      }
    }
    console.log(this);
    return this;
  }

  setIssues(issues: Issue[], myUserId: string): ProjectCard {
    console.log("Setting issues:", issues);
    issues = issues.filter(
      (issue) => issue.getProject().getId() === this.getId()
    );

    this.urgentIssues = issues.filter(
      (issue) => issue.getPriority() >= 80
    ).length;
    this.allOpen = issues.filter(
      (issue) =>
        issue.getStatus() !== "RESOLVED" &&
        issue.getStatus() !== "CANCELED" &&
        issue.getStatus() !== "DONE"
    ).length;
    this.assignedToMe = issues.filter(
      (issue) => issue.getAssignees().includes(myUserId) // TODO: proper way not fake way
    ).length;
    return this;
  }
}
