import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IssueListItems } from "./issue-list-items.component";

describe("IssueListItems", () => {
  let component: IssueListItems;
  let fixture: ComponentFixture<IssueListItems>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueListItems],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueListItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
