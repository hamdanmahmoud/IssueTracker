import { Component, OnInit } from "@angular/core";
import { Project } from "../../../../models/Project";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: [
    "./project-details.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class ProjectDetailsComponent implements OnInit {
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

  ngOnInit(): void {}
}
