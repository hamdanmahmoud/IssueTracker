import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { BasicUser } from "app/models/BasicUser";
import { AuthService } from "app/shared/services/auth.service";
import { RestApiService } from "app/shared/services/rest-api.service";
import { UserService } from "app/shared/services/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  @ViewChild("fileInput") fileInput: any;
  @Input()
  action?: string;

  user: BasicUser;

  description: string;
  name: string;
  title: string;
  mail: string;

  public profilePicture: string = "";

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
    this.mail = this.user.getMail();

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

  async _handleReaderLoaded(e) {
    let reader = e.target;
    this.profilePicture = await this.resizeImage(reader.result);
    this.apiService.uploadProfilePicture(this.profilePicture);
  }

  resizeImage = (base64Str): Promise<string> => {
    return new Promise((resolve) => {
      var img = new Image();
      img.src = base64Str;
      var canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      var context = canvas.getContext("2d");
      img.onload = function () {
        context.drawImage(img, 0, 0, 200, 200); // this doesn't work for some reason
        resolve(canvas.toDataURL());
      };
    });
  };

  save() {
    // this.apiService.updateProfile();
    this.user.setName(this.name);
    this.user.setMail(this.mail);
    this.user.setDescription(this.description);
    this.user.setTitle(this.title);

    console.log(this.user);

    this.userService.updateProfile(this.user["id"], this.user);
    alert('Profile saved');
  }
}
