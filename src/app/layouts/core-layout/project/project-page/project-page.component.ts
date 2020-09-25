import { Component, OnInit } from "@angular/core";
import { Issue } from "app/models/Issue";
import { tasks } from "../../../../fake/fakeData";
export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: "app-project-page",
  templateUrl: "./project-page.component.html",
  styleUrls: [
    "./project-page.component.css",
    "../../../../../assets/css/argon.css",
  ],
})
export class ProjectPageComponent implements OnInit {
  issues: Issue[];
  displayedIssue: Issue;

  folders: Section[] = [
    {
      name: "Photos",
      updated: new Date("1/1/16"),
    },
    {
      name: "Recipes",
      updated: new Date("1/17/16"),
    },
    {
      name: "Work",
      updated: new Date("1/28/16"),
    },
  ];
  notes: Section[] = [
    {
      name: "Vacation Itinerary",
      updated: new Date("2/20/16"),
    },
    {
      name: "Kitchen Remodel",
      updated: new Date("1/18/16"),
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.issues = tasks;
    this.displayedIssue = this.issues[0];
  }
}
