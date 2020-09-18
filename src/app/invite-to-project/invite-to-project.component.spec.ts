import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InviteToProjectComponent } from "./invite-to-project.component";

describe("InviteComponent", () => {
  let component: InviteToProjectComponent;
  let fixture: ComponentFixture<InviteToProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviteToProjectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
