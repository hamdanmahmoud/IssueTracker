import { Injectable } from "@angular/core";
import { Role } from "app/models/Role";
import { RestApiService } from "./rest-api.service";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private apiService: RestApiService) {}

  getRolesOfProjectById(projectId: string): Promise<Role[]> {
    return this.apiService.getRolesOfProjectById(projectId);
  }

  createRole(role: Role) {
    return this.apiService.createRole(role);
  }
}
