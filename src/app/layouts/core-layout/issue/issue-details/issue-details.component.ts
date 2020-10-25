import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IssueType, IssueTypeName } from "../../../../models/IssueType";
import { TrackerProject } from "../../../../models/TrackerProject";
import {
  projectsCreatedByMe,
  collaborations,
} from "../../../../shared/services/fakeData";
@Component({
  selector: "app-issue-details",
  templateUrl: "./issue-details.component.html",
  styleUrls: ["./issue-details.component.css"],
})
export class IssueDetailsComponent implements OnInit {
  action: "create" | "edit";
  project: TrackerProject;
  projects: TrackerProject[];

  defaultIssueType: IssueType;

  issueTypes: IssueType[] = [
    {
      name: IssueTypeName.BUG,
      iconName: "bug_report",
      color: "red",
    },
    {
      name: IssueTypeName.TASK,
      iconName: "assignment",
      color: "green",
    },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("Issue-details");
    this.project = this.data.project;
    this.action = this.data.action;
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
