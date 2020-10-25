import { Component, Input, OnInit } from "@angular/core";
import { Issue } from "../../../../models/Issue";

@Component({
  selector: "app-issue-list-items",
  templateUrl: "./issue-list-items.component.html",
  styleUrls: [
    "./issue-list-items.component.css",
    "../../../../../assets/css/argon.css",
  ],
})
export class IssueListItems implements OnInit {
  @Input()
  issues: Issue[];

  @Input()
  selectIssue: (issue: Issue) => void;

  constructor() {}

  ngOnInit(): void {
    console.log("IssueList");
    console.log(this.issues);
    console.log(this.selectIssue);
  }
}
