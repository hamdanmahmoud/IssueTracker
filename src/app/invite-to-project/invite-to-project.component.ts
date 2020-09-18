import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-invite-to-project",
  templateUrl: "./invite-to-project.component.html",
  styleUrls: [
    "./invite-to-project.component.scss",
    "../../assets/scss/argon-styles.scss",
  ],
})
export class InviteToProjectComponent implements OnInit {
  public mails: any[] = [
    {
      address: "",
    },
    {
      address: "",
    },
    {
      address: "",
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  addMail() {
    this.mails.push({
      address: "",
    });
  }

  removeLastMail() {
    if (this.mails.length > 1) this.mails.splice(this.mails.length - 1);
  }

  next() {}
}
