import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-project",
  templateUrl: "./create-project.component.html",
  styleUrls: [
    "./create-project.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class CreateProjectComponent implements OnInit {
  constructor() {
    console.log("Create-project");
  }

  ngOnInit(): void {}
}
