import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFormModalComponent } from './print-form-modal.component';

describe('PrintFormModalComponent', () => {
  let component: PrintFormModalComponent;
  let fixture: ComponentFixture<PrintFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintFormModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
