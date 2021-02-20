import { Component, Input, OnInit } from "@angular/core";
import { ProjectCard } from "../../../../models/ProjectCard";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.scss"],
})
export class ProjectCardComponent implements OnInit {
  @Input()
  project: ProjectCard;

  constructor() {}

  ngOnInit(): void {}
}
