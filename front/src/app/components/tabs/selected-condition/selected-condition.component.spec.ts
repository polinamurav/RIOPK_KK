import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedConditionComponent } from './selected-condition.component';

describe('SelectedConditionComponent', () => {
  let component: SelectedConditionComponent;
  let fixture: ComponentFixture<SelectedConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedConditionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
