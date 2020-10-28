import { Issue } from "./Issue";
import { Project } from "./Project";
import { Role } from "./Role";
import { User } from "./User";

export class TrackerProject extends Project {
  private owner: string;
  private collaborators: User[];
  private issues: Issue[];
  private roles: Role[];

  getRoles(): Role[] {
    return this.roles;
  }

  getCollaborators(): User[] {
    return this.collaborators;
  }

  setRoles(modifiedRoles: Role[]) {
    this.roles = modifiedRoles;
  }

  getOwnerId(): string {
    return this.owner;
  }

  setOwner(owner: string) {
    this.owner = owner;
  }

  setCollaborators(collaborators: User[]) {
    this.collaborators = collaborators ? collaborators : [];
  }
}
