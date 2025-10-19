import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ThemeModule } from '@app/theme/theme.module';
import { QueuesPageComponent } from './queues-page.component';

describe('QueuesPageComponent', () => {
  let component: QueuesPageComponent;
  let fixture: ComponentFixture<QueuesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ThemeModule, HttpClientTestingModule],
      declarations: [QueuesPageComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
