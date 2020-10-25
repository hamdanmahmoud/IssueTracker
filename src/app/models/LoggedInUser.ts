import { Role } from "./Role";
import { User } from "./User";

export class LoggedInUser extends User {
  private token: string;

  getToken(): string {
    return this.token;
  }

  constructor(
    id?: string,
    firstName?: string,
    lastName?: string,
    mail?: string,
    imageUrl?: string,
    roles?: Role[],
    token?: string
  ) {
    super(id, firstName, lastName, mail, imageUrl, roles);
    this.token = token;
  }
}
