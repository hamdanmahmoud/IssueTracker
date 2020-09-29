import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Issue } from "app/models/Issue";
import { IssueStatus } from "app/models/IssueStatus";
import { statusOptions, getIssueById } from "../../../../fake/fakeData";

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
  selectedIssue: Issue;
  statusList: IssueStatus[];

  constructor(private route: ActivatedRoute) {}

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
}
