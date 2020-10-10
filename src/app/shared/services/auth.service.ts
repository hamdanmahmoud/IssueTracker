import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoggedInUser } from "app/models/LoggedInUser";
import { UserToLogIn } from "app/models/UserToLogIn";
import { BehaviorSubject } from "rxjs";
import { ServerService } from "./server.service";

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(true);
  private token: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private server: ServerService) {
    console.log("Auth Service");
    const userData = localStorage.getItem("user");
    if (userData) {
      console.log("Logged in from memory");
      const user: LoggedInUser = Object.assign(
        new LoggedInUser(),
        JSON.parse(userData)
      );
      this.token = user.token;

      // TODO: additional checks, such as expiration on token

      // finally
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
  }

  login(user: UserToLogIn) {
    if (user.mail !== "" && user.password !== "") {
      return this.server
        .request("POST", "/login", {
          mail: user.mail,
          password: user.password,
        })
        .subscribe((response: any) => {
          if (response.auth === true && response.token !== undefined) {
            this.token = response.token;
            this.server.setLoggedIn(true, this.token);
            this.loggedIn.next(true);
            const userData = {
              token: this.token,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            this.router.navigateByUrl("/profile");
          }
        });
    }
  }

  logout() {
    this.server.setLoggedIn(false);
    delete this.token;

    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
