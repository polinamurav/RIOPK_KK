import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {AttributesSettingComponent} from "@app/pages/administration/administration-page/attributes-setting/attributes-setting.component";
import {AttributesSettingPageComponent} from "@app/pages/administration/administration-page/attributes-setting/attributes-setting-page/attributes-setting-page.component";
import {AttributesSettingRoutingModule} from "@app/pages/administration/administration-page/attributes-setting/attributes-setting-routing.component.module";

@NgModule({
  imports: [AttributesSettingRoutingModule, SharedModule],
  declarations: [AttributesSettingComponent, AttributesSettingPageComponent],
  providers: []
})
export class AttributesSettingModule {}
