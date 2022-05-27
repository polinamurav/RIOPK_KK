import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RetailAppRootComponent } from '@app/components/retail-app/retail-app-root/retail-app-root.component';

describe('RetailAppRootComponent', () => {
  let component: RetailAppRootComponent;
  let fixture: ComponentFixture<RetailAppRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetailAppRootComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailAppRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
