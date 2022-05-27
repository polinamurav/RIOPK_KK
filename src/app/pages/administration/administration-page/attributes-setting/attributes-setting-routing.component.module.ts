import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AttributesSettingComponent} from "@app/pages/administration/administration-page/attributes-setting/attributes-setting.component";
import {AttributesSettingPageComponent} from "@app/pages/administration/administration-page/attributes-setting/attributes-setting-page/attributes-setting-page.component";

const routes: Routes = [
  {
    path: '',
    component: AttributesSettingComponent,
    children: [
      {
        path: '',
        component: AttributesSettingPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesSettingRoutingModule {}
