import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListModalComponent } from './company-list-modal.component';

describe('CompanyListModalComponent', () => {
  let component: CompanyListModalComponent;
  let fixture: ComponentFixture<CompanyListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyListModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
