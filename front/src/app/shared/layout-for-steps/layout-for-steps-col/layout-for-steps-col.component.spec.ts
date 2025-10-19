import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutForStepsColComponent } from './layout-for-steps-col.component';

describe('LayoutForStepsColComponent', () => {
  let component: LayoutForStepsColComponent;
  let fixture: ComponentFixture<LayoutForStepsColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutForStepsColComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutForStepsColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
