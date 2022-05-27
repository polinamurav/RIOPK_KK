import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceConditionModalComponent } from './insurance-condition-modal.component';

describe('AddProductModalComponent', () => {
  let component: InsuranceConditionModalComponent;
  let fixture: ComponentFixture<InsuranceConditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceConditionModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceConditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
