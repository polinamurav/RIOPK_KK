import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritizatuionPageComponent } from './prioritizatuion-page.component';

describe('PrioritizatuionPageComponent', () => {
  let component: PrioritizatuionPageComponent;
  let fixture: ComponentFixture<PrioritizatuionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrioritizatuionPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritizatuionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
