import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { SettingsRoutingModule } from './settings-routing.component.module';
import { SettingsComponent } from './settings.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  imports: [SettingsRoutingModule, SharedModule],
  declarations: [SettingsComponent, SettingsPageComponent],
  providers: []
})
export class SettingsModule {}
