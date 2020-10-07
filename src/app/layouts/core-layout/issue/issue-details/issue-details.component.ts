import { Component, Input, OnInit } from "@angular/core";
import { IssueType } from "app/models/IssueType";
import { TrackerProject } from "app/models/TrackerProject";
import { projectsCreatedByMe, collaborations } from "../../../../fake/fakeData";
@Component({
  selector: "app-issue-details",
  templateUrl: "./issue-details.component.html",
  styleUrls: ["./issue-details.component.css"],
})
export class IssueDetailsComponent implements OnInit {
  @Input()
  action: "create" | "edit";

  projects: TrackerProject[];

  defaultIssueType: IssueType;

  issueTypes: IssueType[] = [
    {
      name: "Bug",
      iconName: "bug_report",
      color: "red",
    },
    {
      name: "Task",
      iconName: "assignment",
      color: "green",
    },
  ];

  constructor() {
    console.log("Issue-details");
  }

  ngOnInit(): void {
    this.projects = [...projectsCreatedByMe, ...collaborations];
    this.defaultIssueType = this.issueTypes[0];

    if (this.action === "create") return;

    // TODO: edit logic goes here, should import existing fields
  }

  compareFn(f1, f2): boolean {
    return f1 && f2 ? f1.name === f2.name : f1 === f2;
  }

  saveIssue() {
    throw "Not implemented";
  }
}
