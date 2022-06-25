import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Issue } from "../../../../models/Issue";
import { IssueStatus } from "../../../../models/IssueStatus";
import { statusOptions } from "../../../../shared/services/appData";
import { MatDialog } from "@angular/material/dialog";
import { MultiSelectComponent } from "../../multi-select/multi-select.component";
import { IssueService } from "app/shared/services/issue.service";

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
  @Input() selectedIssue: Issue;
  statusList: IssueStatus[];
  @ViewChild("progressBar") progressBar: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private issueService: IssueService
  ) {}

  ngOnInit(): void {
    console.log("Selected issue id is", this.selectedIssueId);
    if (!this.selectedIssueId) {
      this.selectedIssueId = this.route.snapshot.paramMap.get("id");
      // this.selectedIssue = getIssueById(this.selectedIssueId);

      if (!this.selectedIssueId) {
        throw "Id for issue not provided";
      }
    }

    this.statusList = statusOptions;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Changes to selected issue:", changes);
    this.selectedIssueId = changes.selectedIssueId.currentValue;
    // this.selectedIssue = getIssueById(this.selectedIssueId);
  }

  onEditAssigneesClick() {
    console.log("Clicked edit assignees");
    const dialogRef = this.dialog.open(MultiSelectComponent, {
      width: "20rem",
      height: "16rem",
      data: {
        selectedIssue: this.selectedIssue,
        projectId: this.projectId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  changeStatusOfIssue(value) {
    this.selectedIssue.setStatus(value);
    this.issueService.updateIssue(this.selectedIssue);
  }

  onClickOnProgressBar(event, issue: Issue) {
    const width = this.progressBar.nativeElement.offsetWidth;
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; //x position within the element.
    const newProgress = Math.round((x / width) * 100);
    issue.setProgress(newProgress >= 0 ? newProgress : 0);

    this.issueService.updateIssue(issue).then((issue) => console.log(issue));
    // TODO: update through service
  }
}
