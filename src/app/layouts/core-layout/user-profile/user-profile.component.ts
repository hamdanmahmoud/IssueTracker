import { Component, Input, OnInit } from "@angular/core";
import {
  profileDescription,
  profileName,
  profileTitle,
} from "../../../fake/fakeData";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  @Input()
  action?: string;

  description: string;
  name: string;
  title: string;

  constructor() {}

  ngOnInit() {
    this.description = profileDescription;
    this.name = profileName;
    this.title = profileTitle;
  }
}
