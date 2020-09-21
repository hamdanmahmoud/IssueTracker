import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { API } from "../../../../API.conf";
import { Project } from "app/models/Project";

@Component({
  selector: "app-projects-table",
  templateUrl: "./projects-table.component.html",
  styleUrls: [
    "./projects-table.component.scss",
    "../../../../../assets/css/argon.css",
  ],
})
export class ProjectsTableComponent implements OnInit {
  @Input()
  data: Project[];

  @Input()
  displayedColumns: string[];

  dataSource: MatTableDataSource<Project>;
  selection = new SelectionModel<Project>(true, []);

  constructor(private API: API) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Project>(this.data);
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
  checkboxLabel(row?: Project): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      this.dataSource.data.findIndex((element) => element.id === row.id) + 1
    }`;
  }
}