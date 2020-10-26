import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Issue } from "../../../../models/Issue";
import { IssueStatus } from "../../../../models/IssueStatus";
import {
  statusOptions,
  getIssueById,
} from "../../../../shared/services/fakeData";
import { MatDialog } from "@angular/material/dialog";
import { MultiSelectComponent } from "../../multi-select/multi-select.component";

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
  @Input() selectedIssueId: string;
  @Input() projectId: string;
  selectedIssue: Issue;
  statusList: IssueStatus[];

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log("Selected issue id is", this.selectedIssueId);
    if (!this.selectedIssueId) {
      this.selectedIssueId = this.route.snapshot.paramMap.get("id");
      this.selectedIssue = getIssueById(this.selectedIssueId);

      if (!this.selectedIssueId) {
        throw "Id for issue not provided";
      }
    }

    this.statusList = statusOptions;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedIssue = getIssueById(this.selectedIssueId);
  }

  onEditAssigneesClick() {
    console.log("Clicked edit assignees");
    const dialogRef = this.dialog.open(MultiSelectComponent, {
      width: "20rem",
      height: "16rem",
      data: {
        selectedOptionsList: this.selectedIssue.getAssignees(),
        projectId: this.projectId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
