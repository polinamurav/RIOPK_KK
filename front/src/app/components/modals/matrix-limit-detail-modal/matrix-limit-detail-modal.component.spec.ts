import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixLimitDetailModalComponent } from './matrix-limit-detail-modal.component';

describe('MatrixLimitDetailModalComponent', () => {
  let component: MatrixLimitDetailModalComponent;
  let fixture: ComponentFixture<MatrixLimitDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatrixLimitDetailModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixLimitDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
