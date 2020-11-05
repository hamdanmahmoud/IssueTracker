import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Issue } from "app/models/Issue";
import { IssueService } from "app/shared/services/issue.service";
import { ProjectService } from "app/shared/services/project.service";
import { IssueType, IssueTypeName } from "../../../../models/IssueType";
import { TrackerProject } from "../../../../models/TrackerProject";
@Component({
  selector: "app-issue-details",
  templateUrl: "./issue-details.component.html",
  styleUrls: ["./issue-details.component.css"],
})
export class IssueDetailsComponent implements OnInit {
  action: "create" | "edit";
  project: TrackerProject;
  projects: TrackerProject[];

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
  selectedIssueType: IssueType;

  summary: string = "";
  description: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private issueService: IssueService,
    private router: Router
  ) {
    console.log("Issue-details");
    this.project = this.data.project;
    this.action = this.data.action;
  }

  async ngOnInit() {
    this.selectedIssueType = this.issueTypes[0];

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
        issue.setType(this.selectedIssueType.name);
        issue.setSummary(this.summary);
        issue.setDescription(this.description);
        issue.setCreated(new Date());

        this.issueService.createIssue(issue).then((issue: Issue) => {
          console.log("Newly created issue:", issue);
          const issueId = issue.getId();
          this.router.navigate([
            "/projects",
            this.project.getId(),
            "issues",
            issueId,
          ]);
        });
        break;
      case "edit":
        break;
      default:
        throw "Not a valid option";
    }
  }

  selectIssueType(type: IssueType) {
    console.log(type);
    this.selectedIssueType = type;
  }
}
