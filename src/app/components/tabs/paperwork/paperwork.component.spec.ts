import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperworkComponent } from './paperwork.component';

describe('PaperworkComponent', () => {
  let component: PaperworkComponent;
  let fixture: ComponentFixture<PaperworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaperworkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
