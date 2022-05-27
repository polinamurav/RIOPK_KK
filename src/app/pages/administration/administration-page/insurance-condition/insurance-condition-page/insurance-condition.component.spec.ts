import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InsuranceConditionPageComponent } from './insurance-condition.component';

describe('ProductCatalogPageComponent', () => {
  let component: InsuranceConditionPageComponent;
  let fixture: ComponentFixture<InsuranceConditionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceConditionPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceConditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
