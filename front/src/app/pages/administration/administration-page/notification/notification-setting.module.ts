import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { NotificationRoutingModule } from './notification-setting-routing.component.module';
import { NotificationSettingComponent } from './notification-setting.component';
import { NotificationSettingPageComponent } from './notification-page/notification-setting-page.component';

@NgModule({
  imports: [NotificationRoutingModule, ThemeModule],
  declarations: [NotificationSettingComponent, NotificationSettingPageComponent],
  providers: []
})
export class NotificationSettingModule {}
