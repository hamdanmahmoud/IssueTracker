import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRolesOnProjectComponent } from './manage-roles-on-project.component';

describe('ManageRolesOnProjectComponent', () => {
  let component: ManageRolesOnProjectComponent;
  let fixture: ComponentFixture<ManageRolesOnProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRolesOnProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRolesOnProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
