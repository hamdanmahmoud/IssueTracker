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
    // let user = await this.http
    //   .get<User>(API.userURL + "/users/" + id, this.httpOptions)
    //   .pipe(retry(1), catchError(this.handleError))
    //   .toPromise();
    // return user;
    return;
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
          resolve(projects._embedded.projects)
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
          resolve(issues._embedded.issues)
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
