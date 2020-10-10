import { Role } from "./Role";

export class User {
  private id: string;
  private firstName: string;
  private lastName: string;
  private mail: string;
  private imageUrl: string;
  private roles: Role[];

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

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }
}
