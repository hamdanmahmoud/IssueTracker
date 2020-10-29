import { Role } from "./Role";

export class User {
  private id: string;
  private name: string;
  private mail: string;
  private picture: string;
  private roles: Role[];
  private title: string;
  private description: string;

  constructor(
    id?: string,
    name?: string,
    mail?: string,
    picture?: string,
    roles?: Role[]
  ) {
    this.id = id;
    this.name = name;
    this.mail = mail;
    this.picture = picture;
    this.roles = roles;
  }

  setId(id: string) {
    this.id = id;
  }

  setMail(mail: string) {
    this.mail = mail;
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

  getName() {
    return this.name;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getMail() {
    return this.mail;
  }
}
