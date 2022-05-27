import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCatalogPageComponent } from './product-catalog.component';

describe('ProductCatalogPageComponent', () => {
  let component: ProductCatalogPageComponent;
  let fixture: ComponentFixture<ProductCatalogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCatalogPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
