import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TrackerProject } from "app/models/TrackerProject";
import { User } from "app/models/User";
import { AuthService } from "app/shared/services/auth.service";
import { UserService } from "app/shared/services/user.service";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: [
    "./project-details.component.css",
    "../../dashboard/dashboard.component.css",
  ],
})
export class ProjectDetailsComponent implements OnInit {
  @Input()
  action: "create" | "edit";
  title: string = "";
  summary: string = "";

  public mails: any[] = [
    {
      address: "",
    },
  ];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    console.log("Project-details with action = ", this.action);
  }

  addMail() {
    this.mails.push({
      address: "",
    });
  }

  removeLastMail() {
    if (this.mails.length > 1) this.mails.splice(this.mails.length - 1);
  }

  ngOnInit(): void {
    if (this.action === "create") return;

    // TODO: edit logic goes here
  }

  ngAfterViewInit(): void {}

  async save() {
    switch (this.action) {
      case "create":
        let collaborators: User[];
        if (this.mails[0].address)
          collaborators = await Promise.all<User>(
            this.mails.map(async (mail) => {
              let mailAddress = mail.address;
              return await this.userService.getUserByMail(mailAddress);
            })
          );
        else collaborators = [];

        let project = new TrackerProject();

        // TODO: properly handle with invalid inputs
        if (!this.title || !this.authService.getMyUserId() || !this.summary) return;

        project.setTitle(this.title);
        project.setOwner(this.authService.getMyUserId());
        project.setCollaborators(collaborators);
        project.setSummary(this.summary);
        project.setCreated(new Date());

        this.userService
          .createProject(project)
          .then((project: TrackerProject) => {
            this.router.navigate(["/projects", project.getId()]);
            console.log("Newly created project:", project);
          });
        break;
      case "edit":
        break;
      default:
        throw "Invalid option";
    }
  }
}
