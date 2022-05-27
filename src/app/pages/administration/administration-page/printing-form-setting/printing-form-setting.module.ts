import { NgModule } from '@angular/core';
import { PrintingFormSettingComponent } from './printing-form-setting.component';
import { PrintingFormSettingPageComponent } from './printing-form-setting-page/printing-form-setting-page.component';
import { PrintingFormSettingRoutingModule } from './printing-form-setting-routing.module';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [PrintingFormSettingComponent, PrintingFormSettingPageComponent],
  imports: [SharedModule, PrintingFormSettingRoutingModule]
})
export class PrintingFormSettingModule {}
