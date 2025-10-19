import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAttachComponent } from './table-attach.component';

describe('TableAttachComponent', () => {
  let component: TableAttachComponent;
  let fixture: ComponentFixture<TableAttachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableAttachComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAttachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
