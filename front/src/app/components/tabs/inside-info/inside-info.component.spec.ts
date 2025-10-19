import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideInfoComponent } from './inside-info.component';

describe('InsideInfoComponent', () => {
  let component: InsideInfoComponent;
  let fixture: ComponentFixture<InsideInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsideInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
