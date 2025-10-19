import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PrintingFormSettingComponent } from './printing-form-setting.component';
import { PrintingFormSettingPageComponent } from './printing-form-setting-page/printing-form-setting-page.component';

const routes: Routes = [
  {
    path: '',
    component: PrintingFormSettingComponent,
    children: [
      {
        path: '',
        component: PrintingFormSettingPageComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintingFormSettingRoutingModule {}
