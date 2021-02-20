import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Project } from "../../models/Project";
import { TrackerProject } from "../../models/TrackerProject";
import { RestApiService } from "./rest-api.service";
import { ProjectCard } from "../../models/ProjectCard";
import { Issue } from "../../models/Issue";
import { User } from "../../models/User";
import { BasicUser } from "app/models/BasicUser";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private apiService: RestApiService) {}

  getUserById(id: string): Promise<User> {
    return this.apiService.getUserById(id);
  }

  getUsersOfProjectById(projectId: string): Promise<User[]> {
    return this.apiService.getUsersOfProjectById(projectId);
  }

  getUserByMail(mail: string): Promise<User> {
    return this.apiService.getUserByMail(mail);
  }

  createProject(project: TrackerProject): Promise<TrackerProject> {
    return this.apiService.createProject(project);
  }

  updateProject(project: TrackerProject): Promise<TrackerProject> {
    return this.apiService.updateProject(project.getId(), project);
  }

  updateProfile(id: string, user: BasicUser) {
    return this.apiService.updateProfile(id, user);
  }
}
