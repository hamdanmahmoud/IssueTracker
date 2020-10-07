import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: [
    "./project-details.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class ProjectDetailsComponent implements OnInit {
  @Input()
  action: "create" | "edit";

  public mails: any[] = [
    {
      address: "",
    },
  ];

  constructor() {
    console.log("Project-details");
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

  save() {
    throw "Not implemented";
  }
}
