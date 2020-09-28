import { Component, Input, OnInit } from "@angular/core";
import { Issue } from "app/models/Issue";
import { IssueStatus } from "app/models/IssueStatus";
import { statusOptions } from "../../../../fake/fakeData";

@Component({
  selector: "app-issue-page",
  templateUrl: "./issue-page.component.html",
  styleUrls: [
    "./issue-page.component.css",
    "../../issue/issues-table/issues-table.component.scss",
    "../../../../../assets/css/argon.css",
  ],
})
export class IssuePageComponent implements OnInit {
  @Input()
  displayedIssue: Issue;

  statusList: IssueStatus[];

  constructor() {}

  ngOnInit(): void {
    this.statusList = statusOptions;
  }
}
