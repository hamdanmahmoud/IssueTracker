import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Project } from "../../models/Project";
import { TrackerProject } from "../../models/TrackerProject";
import { RestApiService } from "./rest-api.service";
import { ProjectCard } from "../../models/ProjectCard";
import { Issue } from "../../models/Issue";
import { User } from "../../models/User";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private apiService: RestApiService) {}

  async getUserById(id: string): Promise<User> {
    return this.apiService.getUserById(id);
  }
}
