import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AlreadyLoggedInResolver {
  constructor(private router: Router, private authService: AuthService) {}

  resolve(): void {
    this.authService.isLoggedIn.subscribe((value) => {
      if (value) this.router.navigate(["/dashboard"]);
    });
  }
}
