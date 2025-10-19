import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPersDataModalComponent } from './enter-pers-data-modal.component';

describe('EnterPersDataModalComponent', () => {
  let component: EnterPersDataModalComponent;
  let fixture: ComponentFixture<EnterPersDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnterPersDataModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPersDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
