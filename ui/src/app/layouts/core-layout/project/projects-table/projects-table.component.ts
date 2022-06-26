import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ProjectService } from "app/shared/services/project.service";
import { API } from "../../../../API.conf";
import { TrackerProject } from "../../../../models/TrackerProject";

@Component({
  selector: "app-projects-table",
  templateUrl: "./projects-table.component.html",
  styleUrls: [
    "./projects-table.component.scss",
    "../../../../../assets/scss/responsive-table-styles.scss",
    "../../../../../assets/css/argon.scss",
  ],
})
export class ProjectsTableComponent implements OnInit {
  @Input()
  data: TrackerProject[];

  @Input()
  displayedColumns: string[];

  dataSource: MatTableDataSource<TrackerProject>;
  selection = new SelectionModel<TrackerProject>(true, []);

  constructor(private API: API, private projectService: ProjectService) {}

  ngOnInit(): void {
    console.log("Is this ever called?", this.data);
    this.dataSource = new MatTableDataSource<TrackerProject>(this.data);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TrackerProject): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      this.dataSource.data.findIndex(
        (element) => element.getId() === row.getId()
      ) + 1
    }`;
  }

  removeProject(project: TrackerProject) {
    console.log("Remove project ", project);
    this.projectService.deleteProject(project.getId());
    this.dataSource.data = this.dataSource.data.filter(
      (projectInTable) => !(projectInTable.getId() === project.getId())
    );
  }
}
