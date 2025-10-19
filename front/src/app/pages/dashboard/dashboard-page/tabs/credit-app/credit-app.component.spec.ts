import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAppComponent } from './credit-app.component';

describe('CreditAppComponent', () => {
  let component: CreditAppComponent;
  let fixture: ComponentFixture<CreditAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreditAppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
