import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationLogPageComponent } from './integration-log-page.component';

describe('IntegrationLogPageComponent', () => {
  let component: IntegrationLogPageComponent;
  let fixture: ComponentFixture<IntegrationLogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntegrationLogPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationLogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
