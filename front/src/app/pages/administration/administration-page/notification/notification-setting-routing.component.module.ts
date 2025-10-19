import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationSettingComponent } from './notification-setting.component';
import { NotificationSettingPageComponent } from './notification-page/notification-setting-page.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationSettingComponent,
    children: [
      {
        path: '',
        component: NotificationSettingPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {}
