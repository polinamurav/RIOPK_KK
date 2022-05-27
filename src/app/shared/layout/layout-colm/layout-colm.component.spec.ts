import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutСolmComponent } from './Layout-colm.component';

describe('LayoutСolmComponent', () => {
  let component: LayoutСolmComponent;
  let fixture: ComponentFixture<LayoutСolmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutСolmComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutСolmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
