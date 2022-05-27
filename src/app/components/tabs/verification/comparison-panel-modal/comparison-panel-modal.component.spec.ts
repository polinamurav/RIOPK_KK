import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonPanelModalComponent } from './comparison-panel-modal.component';

describe('ComparisonPanelModalContentComponent', () => {
  let component: ComparisonPanelModalComponent;
  let fixture: ComponentFixture<ComparisonPanelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComparisonPanelModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonPanelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
