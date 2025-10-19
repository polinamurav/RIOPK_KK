import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrmsDecisionModalComponent } from './brms-decision-modal.component';

describe('BrmsDecisionModalComponent', () => {
  let component: BrmsDecisionModalComponent;
  let fixture: ComponentFixture<BrmsDecisionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrmsDecisionModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrmsDecisionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
