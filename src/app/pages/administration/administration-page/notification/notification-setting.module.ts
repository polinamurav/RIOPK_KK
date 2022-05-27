import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { NotificationRoutingModule } from './notification-setting-routing.component.module';
import { NotificationSettingComponent } from './notification-setting.component';
import { NotificationSettingPageComponent } from './notification-page/notification-setting-page.component';

@NgModule({
  imports: [NotificationRoutingModule, SharedModule],
  declarations: [NotificationSettingComponent, NotificationSettingPageComponent],
  providers: []
})
export class NotificationSettingModule {}
