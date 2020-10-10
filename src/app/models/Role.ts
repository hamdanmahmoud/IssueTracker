import { Permission } from "./Permission";

export class Role {
  private id: string;
  private name: string;
  private projectId: string;
  private permissions: Permission[];

  getId(): string {
    return this.id;
  }

  getProjectId(): string {
    return this.projectId;
  }

  getName(): string {
    return this.name;
  }

  getPermissions(): Permission[] {
    return this.permissions;
  }

  setPermissions(permissions: Permission[]) {
    console.log(this.permissions);
    this.permissions = permissions;
    console.log(this.permissions);
  }
}