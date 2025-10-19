import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpCompanySearchModalComponent } from './corp-company-search-modal.component';

describe('CorpCompanySearchModalComponent', () => {
  let component: CorpCompanySearchModalComponent;
  let fixture: ComponentFixture<CorpCompanySearchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CorpCompanySearchModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpCompanySearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
