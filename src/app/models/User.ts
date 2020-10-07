import { Role } from "./Role";

export class User {
  id: string;
  firstName: string;
  lastName: string;
  mail: string;
  imageUrl: string;
  roles: Role[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    mail: string,
    imageUrl: string,
    roles: Role[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.imageUrl = imageUrl;
    this.roles = roles;
  }

  getId(): string {
    return this.id;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getRolesByProjectId(projectId: string): Role[] {
    console.log(`Getting roles by project id. Project id is ${projectId}`);
    console.log(this.roles);
    return this.roles.filter((role) => role.getProjectId() === projectId);
  }

  setRolesOnProject(projectId: string, selectedRolesList: Role[]) {
    this.roles = this.roles.filter(
      (role) => !(role.getProjectId() === projectId)
    );
    this.roles = [...this.roles, ...selectedRolesList];
  }
}
