import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewActionsComponent } from './modal-view-actions.component';

describe('ModalViewActionsComponent', () => {
  let component: ModalViewActionsComponent;
  let fixture: ComponentFixture<ModalViewActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalViewActionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
