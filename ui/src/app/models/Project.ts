export abstract class Project {
  private title: string;
  private summary: string;
  private id: string;
  private created: Date;

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getSummary() {
    return this.summary;
  }

  getCreated() {
    return this.created;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setSummary(summary: string) {
    this.summary = summary;
  }

  setCreated(created: Date) {
    this.created = created;
  }
}
