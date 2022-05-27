import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedConditionModalComponent } from './selected-condition-modal.component';

describe('SelectedConditionModalComponent', () => {
  let component: SelectedConditionModalComponent;
  let fixture: ComponentFixture<SelectedConditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedConditionModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedConditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
