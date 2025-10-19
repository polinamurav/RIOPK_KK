import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableSortComponent } from './table-sort.component';

describe('TableComponent', () => {
  let component: TableSortComponent<any>;
  let fixture: ComponentFixture<TableSortComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableSortComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
