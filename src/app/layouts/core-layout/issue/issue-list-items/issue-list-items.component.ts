import { Component, Input, OnInit } from "@angular/core";
import { Issue } from "app/models/Issue";

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

  constructor() {}

  ngOnInit(): void {}
}
