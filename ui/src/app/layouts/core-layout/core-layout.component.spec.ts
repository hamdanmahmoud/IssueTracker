import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CoreLayoutComponent } from "./core-layout.component";

describe("CoreLayoutComponent", () => {
  let component: CoreLayoutComponent;
  let fixture: ComponentFixture<CoreLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoreLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
