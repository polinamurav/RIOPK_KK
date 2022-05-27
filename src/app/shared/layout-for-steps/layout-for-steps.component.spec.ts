import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutForStepsComponent } from './layout-for-steps.component';

describe('LayoutForStepsComponent', () => {
  let component: LayoutForStepsComponent;
  let fixture: ComponentFixture<LayoutForStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutForStepsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutForStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
