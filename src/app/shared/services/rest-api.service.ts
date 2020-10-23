import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { API } from "../../API.conf";
import { AuthService } from "./auth.service";
import { Project } from "app/models/Project";
import { TrackerProject } from "app/models/TrackerProject";

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

  // HttpClient API get() method => Fetch projects list
  getProjects(): Observable<TrackerProject> {
    return this.http
      .get<TrackerProject>(API.projectURL + "/projects", this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch project
  getProject(id): Observable<TrackerProject> {
    return this.http
      .get<TrackerProject>(API.projectURL + "/projects/" + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
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
