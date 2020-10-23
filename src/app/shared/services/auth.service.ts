import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoggedInUser } from "app/models/LoggedInUser";
import { UserToLogIn } from "app/models/UserToLogIn";
import { BehaviorSubject } from "rxjs";
import { RootInjectorGuard } from "./RootInjectorGuard";
import { ServerService } from "./server.service";

@Injectable({
  providedIn: "root",
})
export class AuthService extends RootInjectorGuard {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private server: ServerService) {
    super(AuthService);
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
    if (user.username !== "" && user.password !== "") {
      return this.server
        .request("POST", "/login", {
          username: user.username,
          password: user.password,
        })
        .toPromise()
        .then((response: any) => {
          const authorization: string = response.headers.get("Authorization");
          if (authorization) {
            this.token = authorization.substring(7);
            this.server.setLoggedIn(true, this.token);
            this.loggedIn.next(true);
            const userData = {
              token: this.token,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            this.router.navigate(["dashboard"]);
          } else {
            console.log("Credentials invalid");
            throw "Credentials invalid";
          }
        })
        .catch((error) => {
          throw error;
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
