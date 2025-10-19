import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReasignModalComponent } from './user-reasign-modal.component';

describe('UserReasignModalComponent', () => {
  let component: UserReasignModalComponent;
  let fixture: ComponentFixture<UserReasignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserReasignModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReasignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
