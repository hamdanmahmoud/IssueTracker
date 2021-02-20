import { BasicUser } from "./BasicUser";
import { Role } from "./Role";

export class User extends BasicUser {
  private id: string;
  private picture: string;
  private roles: Role[];

  constructor(
    id?: string,
    name?: string,
    mail?: string,
    picture?: string,
    roles?: Role[]
  ) {
    super(name, mail);
    this.id = id;
    this.picture = picture;
    this.roles = roles;
  }

  setId(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }

  getProfilePicture(): string {
    return this.picture;
  }

  getRolesByProjectId(projectId: string): Role[] {
    console.log(`Getting roles by project id. Project id is ${projectId}`);
    console.log(this.roles);
    return this.roles.filter((role) => role.getProjectId() === projectId);
  }

  setRolesOnProject(projectId: string, selectedRolesList: Role[]) {
    console.log(this.roles);
    this.roles = this.roles.filter(
      (role) => !(role.getProjectId() === projectId)
    );
    this.roles = [...this.roles, ...selectedRolesList];
  }

  setRoles(roles: Role[]) {
    this.roles = roles;
  }
}
