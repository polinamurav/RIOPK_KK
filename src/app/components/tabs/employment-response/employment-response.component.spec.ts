import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentResponseComponent } from './employment-response.component';

describe('EmploymentResponseComponent', () => {
  let component: EmploymentResponseComponent;
  let fixture: ComponentFixture<EmploymentResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmploymentResponseComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
