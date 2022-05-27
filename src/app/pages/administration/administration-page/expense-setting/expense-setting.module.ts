import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {ExpenseSettingComponent} from "@app/pages/administration/administration-page/expense-setting/expense-setting.component";
import {ExpenseSettingPageComponent} from "@app/pages/administration/administration-page/expense-setting/expense-setting-page/expense-setting-page.component";
import {ExpenseSettingRoutingModule} from "@app/pages/administration/administration-page/expense-setting/expense-setting-routing.component.module";

@NgModule({
  imports: [ExpenseSettingRoutingModule, SharedModule],
  declarations: [ExpenseSettingComponent, ExpenseSettingPageComponent],
  providers: []
})
export class ExpenseSettingModule {}
