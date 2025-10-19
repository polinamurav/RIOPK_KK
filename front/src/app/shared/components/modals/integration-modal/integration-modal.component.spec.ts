import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationModalComponent } from './integration-modal.component';

describe('IntegrationModalComponent', () => {
  let component: IntegrationModalComponent;
  let fixture: ComponentFixture<IntegrationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntegrationModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
