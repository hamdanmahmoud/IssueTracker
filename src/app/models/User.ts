export class User {
  id: string;
  firstName: string;
  lastName: string;
  mail: string;
  imageUrl: string;

  constructor(id: string, firstName: string, lastName: string, mail: string, imageUrl: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.imageUrl = imageUrl;
  }

  getId(): string {
    return this.id;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }
}
