import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { User } from "app/models/User";
import { Permission } from "../../../models/Permission";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { mahmoud, ana, hori } from "../../../fake/fakeData";

@Component({
  selector: "app-multi-select",
  templateUrl: "./multi-select.component.html",
  styleUrls: ["./multi-select.component.css"],
})
export class MultiSelectComponent implements OnInit {
  allOptions: FormControl;
  selectedOptionsList: User[] | Permission[];
  optionsType: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.selectedOptionsList = this.data.selectedOptionsList;

    this.allOptions = new FormControl([mahmoud, ana, hori]);

    if (!this.selectedOptionsList) return;
    switch (true) {
      case this.selectedOptionsList[0] instanceof User:
        this.optionsType = "assignees";
        break;
      case typeof this.selectedOptionsList[0] === "string":
        this.optionsType = "permissions";
        break;
      default:
        throw "Options with this type not allowed";
    }
  }

  compareFn(user1: User, user2: User) {
    console.log(user1, user2);
    return user1.id === user2.id;
  }

  onSave() {
    console.log(this.options.value);
  }
}
