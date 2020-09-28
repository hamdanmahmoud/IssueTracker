export class User {
  id: string;
  firstName: string;
  lastName: string;
  mail: string;

  constructor(id: string, firstName: string, lastName: string, mail: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
  }

  getId(): string {
    return this.id;
  }
}
