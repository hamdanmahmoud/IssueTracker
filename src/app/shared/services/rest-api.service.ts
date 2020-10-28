import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { API } from "../../API.conf";
import { AuthService } from "./auth.service";
import { Project } from "../../models/Project";
import { TrackerProject } from "../../models/TrackerProject";
import { Issue } from "../../models/Issue";
import { User } from "../../models/User";
import { Role } from "app/models/Role";

@Injectable({
  providedIn: "root",
})
export class RestApiService {
  baseUrl = API.authURL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authService.getToken(),
    }),
  };

  async getUserById(id): Promise<User> {
    let user = await this.http
      .get<User>(API.userURL + "/api" + "/users/" + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise()
      .then((user: User) => Object.assign(new User(), user));
    return user;
  }

  // HttpClient API get() method => Fetch projects list
  async getMyProjects(): Promise<TrackerProject[]> {
    let projects = await this.http
      .get<any>(
        API.projectURL +
          "/api" +
          "/projects" +
          "?userId=" +
          this.authService.getMyUserId(),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise()
      .then((projects) => {
        return new Promise((resolve, reject) =>
          projects._embedded
            ? resolve(projects._embedded.projects)
            : resolve([])
        );
      })
      .then((projects: TrackerProject[]) =>
        projects.map((project) => Object.assign(new TrackerProject(), project))
      );
    console.log(projects);
    return projects;
  }

  async getMyIssues(): Promise<Issue[]> {
    let issuesFromDatabase: Array<any> = await this.http
      .get<any>(
        API.issueURL +
          "/api" +
          "/issues" +
          "?userId=" +
          this.authService.getMyUserId(),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise()
      .then((issues) => {
        return new Promise((resolve, reject) =>
          issues._embedded ? resolve(issues._embedded.issues) : resolve([])
        );
      });

    let fullIssues = await Promise.all(
      issuesFromDatabase.map(async (issue) => {
        let project = await this.getProject(issue.project);
        issue.project = Object.assign(new TrackerProject(), project);
        return Object.assign(new Issue(), issue);
      })
    );

    console.log(fullIssues);

    return fullIssues;
  }

  async getRoleById(roleId: string): Promise<Role> {
    let role: Role = await this.http
      .get<any>(API.aclURL + "/api" + "/roles/" + roleId, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .toPromise()
      .then((role: any) => {
        console.log(role);
        return new Promise((resolve, reject) =>
          resolve(Object.assign(new Role(), role))
        );
      });

    return role;
  }

  async getRolesOfProjectById(projectId: string): Promise<Role[]> {
    let roles: Array<any> = await this.http
      .get<any>(
        API.aclURL + "/api" + "/roles" + "?projectId=" + projectId,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise()
      .then((roles: any) => {
        console.log(roles);
        return new Promise((resolve, reject) => resolve(roles._embedded.roles));
      });

    let fullRoles = await roles
      .map((role) => {
        console.log(role);
        role.permissions = role.permissions.map(
          (permission) => permission.authority
        );
        return role;
      })
      .map((role) => Object.assign(new Role(), role));

    return fullRoles;
  }

  async getUsersOfProjectById(projectId: string): Promise<User[]> {
    let userIds: Array<any> = await this.http
      .get<any>(
        API.projectURL + "/api" + "/projects/" + projectId + "/userIds",
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise()
      .then((roles: any) => {
        console.log(roles);
        return new Promise((resolve, reject) => resolve(roles));
      });

    let users = await Promise.all(
      userIds.map(async (id) => {
        let user = await this.getUserById(id);
        console.log(user);
        return Object.assign(new User(), user);
      })
    );

    return users;
  }

  async getRolesOfUserDefinedOnProject(
    projectId: string,
    userId: string
  ): Promise<Role[]> {
    // get role ids of user by id (from project microservice)
    let roleIds: Array<any> = await this.http
      .get<any>(
        API.projectURL +
          "/api" +
          "/users/" +
          userId +
          "/roles?projectId=" +
          projectId,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise()
      .then((ids: any) => {
        console.log(ids);
        return new Promise((resolve, reject) => resolve(ids.roleIds));
      });
    console.log("Ids retrieved", roleIds);

    // with each id, new Promise to get that role from acl microservice
    let roles = await Promise.all(
      roleIds.map(async (id) => {
        let role = await this.getRoleById(id);
        console.log(role);
        return Object.assign(new Role(), role);
      })
    );
    // return roles
    console.log("Roles retrieved", roles);

    return roles;
  }

  // HttpClient API get() method => Fetch project
  getProject(id): Promise<TrackerProject> {
    return this.http
      .get<TrackerProject>(
        API.projectURL + "/api" + "/projects/" + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  getProfilePicture(id: string): Promise<Blob> {
    return this.http
      .get(API.userURL + "/api" + "/users/" + id + "/picture", {
        responseType: "blob",
      })
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  uploadProfilePicture(file): Promise<any> {
    return this.http
      .post(
        API.userURL +
          "/api" +
          "/users/" +
          this.authService.getMyUserId() +
          "/picture",
        file,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
      .toPromise();
  }

  // HttpClient API post() method => Create project
  createProject(project): Observable<TrackerProject> {
    return this.http
      .post<TrackerProject>(
        API.projectURL + "/projects",
        JSON.stringify(project),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update project
  updateProject(id, project): Observable<TrackerProject> {
    return this.http
      .put<TrackerProject>(
        API.projectURL + "/projects/" + id,
        JSON.stringify(project),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete project
  deleteProject(id) {
    return this.http
      .delete<TrackerProject>(
        API.projectURL + "/projects/" + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
