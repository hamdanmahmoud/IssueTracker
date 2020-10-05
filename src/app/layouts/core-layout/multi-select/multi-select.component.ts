import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { User } from "app/models/User";
import { Permission } from "../../../models/Permission";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { mahmoud, ana, hori, allPermissions } from "../../../fake/fakeData";

@Component({
  selector: "app-multi-select",
  templateUrl: "./multi-select.component.html",
  styleUrls: ["./multi-select.component.css"],
})
export class MultiSelectComponent implements OnInit {
  selectedOptionsList: FormControl;
  allOptions: User[] | Permission[];
  optionsType: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.selectedOptionsList = new FormControl(this.data.selectedOptionsList);

    if (!this.selectedOptionsList) return;

    switch (true) {
      case this.data.selectedOptionsList[0] instanceof User:
        this.optionsType = "assignees";
        break;
      case typeof this.data.selectedOptionsList[0] === "string":
        this.optionsType = "permissions";
        break;
      default:
        throw "Options with this type not allowed";
    }

    switch (this.optionsType) {
      case "assignees":
        this.allOptions = [mahmoud, ana, hori]; // TODO : call service (for either users on project OR permissions list)
        break;
      case "permissions":
        this.allOptions = allPermissions;
        break;
      default:
        throw "Options with this type not allowed";
    }
  }

  comparePermissions(availableOption: Permission, selectedOption: Permission) {
    return availableOption === selectedOption;
  }

  compareUsers(availableOption: User, selectedOption: User) {
    return availableOption.id === selectedOption.id;
  }

  onSave() {
    console.log(this.selectedOptionsList.value);
  }
}
