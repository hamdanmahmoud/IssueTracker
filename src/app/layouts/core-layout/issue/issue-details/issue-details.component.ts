import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Issue } from "app/models/Issue";
import { IssueService } from "app/shared/services/issue.service";
import { ProjectService } from "app/shared/services/project.service";
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

  selectedType: IssueTypeName = this.issueTypes[0].name;
  summary: string = "";
  description: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private issueService: IssueService
  ) {
    console.log("Issue-details");
    this.project = this.data.project;
    this.action = this.data.action;
  }

  async ngOnInit() {
    this.defaultIssueType = this.issueTypes[0];
    this.projects = await this.projectService.getMyProjects();

    if (this.action === "create") return;

    // TODO: edit logic goes here, should import existing fields
  }

  compareFn(f1, f2): boolean {
    return f1 && f2 ? f1.name === f2.name : f1 === f2;
  }

  saveIssue() {
    switch (this.action) {
      case "create":
        let issue = new Issue();
        issue.setProject(this.project);
        issue.setType(this.selectedType);
        issue.setSummary(this.summary);
        issue.setDescription(this.description);
        issue.setCreated(new Date());

        this.issueService
          .createIssue(issue)
          .then((issue) => console.log(issue));
        break;
      case "edit":
        break;
      default:
        throw "Not a valid option";
    }
  }
}
