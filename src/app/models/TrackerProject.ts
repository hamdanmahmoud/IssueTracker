import { Issue } from "./Issue";
import { Project } from "./Project";
import { Role } from "./Role";
import { User } from "./User";

export class TrackerProject extends Project {
  private owner: User;
  private collaborators: User[];
  private created: Date;
  private issues: Issue[];
  private roles: Role[];

  constructor(
    title: string,
    summary: string,
    owner: User,
    collaborators: User[],
    created: Date,
    issues: Issue[],
    id: string,
    roles: Role[]
  ) {
    super(id, title, summary);
    this.owner = owner;
    this.collaborators = collaborators;
    this.created = created;
    this.issues = issues;
    this.roles = roles;
  }

  getRoles(): Role[] {
    return this.roles;
  }

  getCollaborators(): User[] {
    return this.collaborators;
  }

  setRoles(modifiedRoles: Role[]) {
    this.roles = modifiedRoles;
  }
}
