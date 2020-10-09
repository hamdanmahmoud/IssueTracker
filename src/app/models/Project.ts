export abstract class Project {
  private title: string;
  private summary: string;
  private id: string;

  constructor(id, title, summary) {
    this.id = id;
    this.title = title;
    this.summary = summary;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getSummary() {
    return this.summary;
  }
}
