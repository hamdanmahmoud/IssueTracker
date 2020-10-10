export abstract class Project {
  private title: string;
  private summary: string;
  private id: string;

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
