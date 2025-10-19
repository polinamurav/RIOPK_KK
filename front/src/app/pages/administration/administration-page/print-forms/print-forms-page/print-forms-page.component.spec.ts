import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintFormsPageComponent } from './print-forms-page.component';

describe('PrintFormsPageComponent', () => {
  let component: PrintFormsPageComponent;
  let fixture: ComponentFixture<PrintFormsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintFormsPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintFormsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
