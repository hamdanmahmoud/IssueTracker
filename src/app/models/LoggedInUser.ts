import { User } from "./User";

export class LoggedInUser extends User {
  token: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    mail: string,
    token: string
  ) {
    super(id, firstName, lastName, mail);
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }
}
