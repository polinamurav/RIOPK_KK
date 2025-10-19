import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { SettingsRoutingModule } from './settings-routing.component.module';
import { SettingsComponent } from './settings.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  imports: [SettingsRoutingModule, ThemeModule],
  declarations: [SettingsComponent, SettingsPageComponent],
  providers: []
})
export class SettingsModule {}
