import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryResponseComponent } from './history-response.component';

describe('HistoryResponseComponent', () => {
  let component: HistoryResponseComponent;
  let fixture: ComponentFixture<HistoryResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryResponseComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
