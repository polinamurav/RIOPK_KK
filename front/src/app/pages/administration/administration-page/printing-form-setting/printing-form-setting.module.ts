import { NgModule } from '@angular/core';
import { PrintingFormSettingComponent } from './printing-form-setting.component';
import { PrintingFormSettingPageComponent } from './printing-form-setting-page/printing-form-setting-page.component';
import { PrintingFormSettingRoutingModule } from './printing-form-setting-routing.module';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  declarations: [PrintingFormSettingComponent, PrintingFormSettingPageComponent],
  imports: [ThemeModule, PrintingFormSettingRoutingModule]
})
export class PrintingFormSettingModule {}
