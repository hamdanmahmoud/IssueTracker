import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Project } from "../../models/Project";
import { TrackerProject } from "../../models/TrackerProject";
import { RestApiService } from "./rest-api.service";
import { ProjectCard } from "../../models/ProjectCard";
import { Issue } from "../../models/Issue";

@Injectable({
  providedIn: "root",
})
export class IssueService {
  constructor(
    private authService: AuthService,
    private apiService: RestApiService
  ) {}

  async getMyIssues(): Promise<Issue[]> {
    return this.apiService.getMyIssues();
  }
}
