import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProjectService } from "app/shared/services/project.service";
import { RoleService } from "app/shared/services/role.service";
import { Role } from "../../../../models/Role";
import { TrackerProject } from "../../../../models/TrackerProject";
import { User } from "../../../../models/User";
import {
  getRolesOfProjectById,
  allProjects,
} from "../../../../shared/services/fakeData";

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private projectService: ProjectService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.data.user;
    console.log(this.user, this.user.getName());
    this.projectId = this.data.projectId;
    this.project = allProjects.find(
      (project) => project.getId() === this.projectId
    );
    this.selectedRolesList = new FormControl(
      await this.projectService.getRolesOfUserDefinedOnProject(
        this.projectId,
        this.user.getId()
      )
    );
    this.allOptions = await this.roleService.getRolesOfProjectById(
      this.projectId
    );
  }

  compareRoles(availableOption: Role, selectedOption: Role) {
    return availableOption.getId() === selectedOption.getId();
  }

  saveModifications() {
    this.user.setRolesOnProject(this.projectId, this.selectedRolesList.value);

    //TODO: should close this component, perhaps should emit event to parent
  }
}
