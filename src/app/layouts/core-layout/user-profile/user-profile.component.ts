import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { User } from "app/models/User";
import { AuthService } from "app/shared/services/auth.service";
import { RestApiService } from "app/shared/services/rest-api.service";
import { UserService } from "app/shared/services/user.service";
import {
  profileDescription,
  profileName,
  profileTitle,
} from "../../../shared/services/fakeData";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  @ViewChild("fileInput") fileInput: any;
  @Input()
  action?: string;

  user: User;

  description: string;
  name: string;
  title: string;

  private imageSrc: string = "";
  private profilePicture: string = "";

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private apiService: RestApiService
  ) {}

  async ngOnInit() {
    const myUserId = this.authService.getMyUserId();
    this.user = await this.userService.getUserById(myUserId);
    console.log(this.user);
    this.name = this.user.getName();
    this.description = this.user.getDescription();
    this.title = this.user.getTitle();

    this.profilePicture = await this.apiService
      .getProfilePicture(myUserId)
      .then((blob: Blob) => blob["text"]());
  }

  openFile() {
    console.log("Opening file dialog");
    this.fileInput.nativeElement.click();
  }

  handle(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.profilePicture = reader.result;
    console.log(this.imageSrc);
    this.apiService.uploadProfilePicture(this.profilePicture);
  }
}
