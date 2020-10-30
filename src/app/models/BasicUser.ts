export class BasicUser {
  private name: string;
  private mail: string;
  private title: string;
  private description: string;

  constructor(
    name?: string,
    mail?: string,
    title?: string,
    description?: string
  ) {
    this.name = name;
    this.mail = mail;
    this.title = title;
    this.description = description;
  }

  setMail(mail: string) {
    this.mail = mail;
  }

  setName(name: string) {
    this.name = name;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setTitle(title: string) {
    this.title = title;
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
