import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrmsDecisionComponent } from './brms-decision.component';

describe('BrmsDecisionComponent', () => {
  let component: BrmsDecisionComponent;
  let fixture: ComponentFixture<BrmsDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrmsDecisionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrmsDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
