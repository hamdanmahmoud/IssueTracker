import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Issue } from "app/models/Issue";
import { tasks, bugs } from "../../../../fake/fakeData";

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: "app-project-page",
  templateUrl: "./project-page.component.html",
  styleUrls: [
    "./project-page.component.css",
    "../../../../../assets/css/argon.css",
  ],
})
export class ProjectPageComponent implements OnInit {
  form: FormGroup;
  issues: Issue[];
  selectedIssue: Issue;
  selectedIssueId: string;
  amount: number = 500;

  constructor() {}
  deposit() {
    console.log("This amount is", this.amount);
    this.amount += 100;
  }
  ngOnInit(): void {
    console.log("Project-page");
    this.issues = [...bugs, ...tasks].sort(
      (a, b) => new Date(b.created).valueOf() - new Date(a.created).valueOf()
    );
    this.selectedIssue = this.issues[0];
    this.selectedIssue.selected = true;
    this.selectedIssueId = this.selectedIssue.id;
  }

  selectIssue(issue: Issue): void {
    this.selectedIssue.selected = false;
    this.selectedIssue = issue;
    this.selectedIssue.selected = true;
    this.selectedIssueId = issue.id;
    console.log("Selected issue id changed to", this.selectedIssueId);
  }
}
