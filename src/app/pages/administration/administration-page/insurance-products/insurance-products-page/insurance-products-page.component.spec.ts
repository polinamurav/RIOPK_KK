import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProductsPageComponent } from './insurance-products-page.component';

describe('CompanyListPageComponent', () => {
  let component: InsuranceProductsPageComponent;
  let fixture: ComponentFixture<InsuranceProductsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceProductsPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
