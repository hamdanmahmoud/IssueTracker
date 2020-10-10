import { Role } from "./Role";
import { User } from "./User";

export class LoggedInUser extends User {
  token: string;

  getToken(): string {
    return this.token;
  }
}
