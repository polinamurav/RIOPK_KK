import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseOptionsModalComponent } from './choose-options-modal.component';

describe('ChooseOptionsModalComponent', () => {
  let component: ChooseOptionsModalComponent;
  let fixture: ComponentFixture<ChooseOptionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseOptionsModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
