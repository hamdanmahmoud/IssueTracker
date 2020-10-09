import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Role } from "app/models/Role";
import { TrackerProject } from "app/models/TrackerProject";
import { User } from "app/models/User";
import { getRolesOfProjectById, allProjects } from "../../../../fake/fakeData";

@Component({
  selector: "app-manage-user-roles",
  templateUrl: "./manage-user-roles.component.html",
  styleUrls: ["./manage-user-roles.component.css"],
})
export class ManageUserRolesComponent implements OnInit {
  user: User;
  project: TrackerProject;
  projectId: string;
  selectedRolesList: FormControl;
  allOptions: Role[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.user = this.data.user;
    this.projectId = this.data.projectId;
    this.project = allProjects.find(
      (project) => project.getId() === this.projectId
    );
    this.selectedRolesList = new FormControl(
      this.user.getRolesByProjectId(this.projectId)
    );
    this.allOptions = getRolesOfProjectById(this.projectId);
  }

  compareRoles(availableOption: Role, selectedOption: Role) {
    return availableOption.getId() === selectedOption.getId();
  }

  saveModifications() {
    this.user.setRolesOnProject(this.projectId, this.selectedRolesList.value);

    //TODO: should close this component, perhaps should emit event to parent
  }
}
