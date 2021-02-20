import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-issue",
  templateUrl: "./create-issue.component.html",
  styleUrls: [
    "./create-issue.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class CreateIssueComponent implements OnInit {
  constructor() {
    console.log("Create-issue");
  }

  ngOnInit(): void {}
}
