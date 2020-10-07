import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ManageUsersOnProject } from "./manage-users-on-project.component";

describe("ManageRolesComponent", () => {
  let component: ManageUsersOnProject;
  let fixture: ComponentFixture<ManageUsersOnProject>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUsersOnProject],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersOnProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
