import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "app/shared/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: [
    "./register.component.scss",
    "../../../../assets/scss/argon-styles.scss",
  ],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      password: ["", Validators.required],
      mail: ["", Validators.email],
    });
  }

  async onRegister() {
    if (this.form.valid) {
      try {
        await this.authService.register(this.form.value);
      } catch (err) {
        console.log("Catched error");
      }
    }
  }
}
