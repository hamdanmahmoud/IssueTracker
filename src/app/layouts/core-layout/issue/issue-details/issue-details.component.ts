import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-issue-details",
  templateUrl: "./issue-details.component.html",
  styleUrls: [
    "./issue-details.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class IssueDetailsComponent implements OnInit {
  @Input()
  action: "create" | "edit";
  compareFn(f1, f2): boolean {
    return f1 && f2 ? f1.name === f2.name : f1 === f2;
  }
  defaultIssueType = {
    name: "Bug",
    iconName: "bug_report",
    color: "red",
  };
  public issueTypes = [
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

  public mails: any[] = [
    {
      address: "",
    },
  ];

  constructor() {
    console.log("Issue-details");
  }

  addMail() {
    this.mails.push({
      address: "",
    });
  }

  removeLastMail() {
    if (this.mails.length > 1) this.mails.splice(this.mails.length - 1);
  }

  ngOnInit(): void {
    if (this.action === "create") return;

    // TODO: edit logic goes here
  }

  ngAfterViewInit(): void {}
}
