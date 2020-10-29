export class BasicUser {
  private name: string;
  private mail: string;
  private title: string;
  private description: string;

  constructor(name?: string, mail?: string) {
    this.name = name;
    this.mail = mail;
  }

  setMail(mail: string) {
    this.mail = mail;
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
