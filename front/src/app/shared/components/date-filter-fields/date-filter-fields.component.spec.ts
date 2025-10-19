import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterFieldsComponent } from './date-filter-fields.component';

describe('DateFilterFieldsComponent', () => {
  let component: DateFilterFieldsComponent;
  let fixture: ComponentFixture<DateFilterFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateFilterFieldsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFilterFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
