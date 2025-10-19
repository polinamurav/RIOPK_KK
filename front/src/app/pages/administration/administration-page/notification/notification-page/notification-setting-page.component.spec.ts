import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationSettingPageComponent } from './notification-setting-page.component';

describe('NotificationPageComponent', () => {
  let component: NotificationSettingPageComponent;
  let fixture: ComponentFixture<NotificationSettingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationSettingPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSettingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
