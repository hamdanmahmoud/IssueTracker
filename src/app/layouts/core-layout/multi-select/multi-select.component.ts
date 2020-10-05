import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { User } from "app/models/User";
import { Permission } from "../../../models/Permission";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";

@Component({
  selector: "app-multi-select",
  templateUrl: "./multi-select.component.html",
  styleUrls: ["./multi-select.component.css"],
})
export class MultiSelectComponent implements OnInit {
  options = new FormControl();
  optionsList: User[] | Permission[];

  optionsType: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.optionsList = this.data.optionsList;

    if (!this.optionsList) return;
    switch (true) {
      case this.optionsList[0] instanceof User:
        this.optionsType = "Users";
        break;
      case typeof this.optionsList[0] === "string":
        this.optionsType = "Permissions";
        break;
      default:
        throw "Options with this type not allowed";
    }
  }

  onSave() {
    console.log(this.options.value);
  }
}
