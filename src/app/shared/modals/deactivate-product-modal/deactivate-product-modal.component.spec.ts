import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateProductModalComponent } from './deactivate-product-modal.component';

describe('DeactivateProductModalComponent', () => {
  let component: DeactivateProductModalComponent;
  let fixture: ComponentFixture<DeactivateProductModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeactivateProductModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
