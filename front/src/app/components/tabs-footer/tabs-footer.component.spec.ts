import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsFooterComponent } from './tabs-footer.component';

describe('TabsFooterComponent', () => {
  let component: TabsFooterComponent;
  let fixture: ComponentFixture<TabsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsFooterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
