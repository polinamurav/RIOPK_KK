import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioFilterFieldsComponent } from './radio-filter-fields.component';

describe('RadioFilterFieldsComponent', () => {
  let component: RadioFilterFieldsComponent;
  let fixture: ComponentFixture<RadioFilterFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioFilterFieldsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioFilterFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
