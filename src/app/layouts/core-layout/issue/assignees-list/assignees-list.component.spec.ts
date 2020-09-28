import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneesListComponent } from './assignees-list.component';

describe('AssigneesListComponent', () => {
  let component: AssigneesListComponent;
  let fixture: ComponentFixture<AssigneesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigneesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
