import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Project } from "../../models/Project";
import { TrackerProject } from "../../models/TrackerProject";
import { RestApiService } from "./rest-api.service";
import { ProjectCard } from "../../models/ProjectCard";
import { Issue } from "../../models/Issue";
import { IssueService } from "./issue.service";
import { Role } from "app/models/Role";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  myProjects: TrackerProject[];

  constructor(
    private authService: AuthService,
    private apiService: RestApiService,
    private issueService: IssueService
  ) {}

  async getMyProjectCards(): Promise<ProjectCard[]> {
    let myIssues = await this.issueService.getMyIssues();
    console.log(myIssues);
    return this.apiService.getMyProjects().then((projects: TrackerProject[]) =>
      projects
        .map((project) => new ProjectCard().fromProjectToCard(project))
        .map((project) =>
          project.setIssues(myIssues, this.authService.getMyUserId())
        )
        .filter(
          (project) =>
            project.assignedToMe || project.urgentIssues || project.allOpen
        )
    );
  }

  async getMyProjects(): Promise<TrackerProject[]> {
    this.myProjects = await this.apiService.getMyProjects();
    return this.myProjects;
  }

  getProjectById(projectId: string): TrackerProject {
    console.log(this.myProjects);
    let project = this.myProjects.find(
      (project: TrackerProject) => project.getId() === projectId
    );
    return project;
  }

  getRolesOfUserDefinedOnProject(
    projectId: string,
    userId: string
  ): Promise<Role[]> {
    return this.apiService.getRolesOfUserDefinedOnProject(projectId, userId);
  }

  deleteProject(id: string) {
    this.apiService.deleteProject(id);
  }

  updateUserRolesByProjectId(
    projectId: string,
    userId: string,
    selectedRoles: Role[]
  ) {
    this.apiService.updateUserRolesByProjectId(
      projectId,
      userId,
      selectedRoles
    );
  }
}
