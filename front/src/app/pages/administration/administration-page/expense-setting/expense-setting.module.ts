import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { ExpenseSettingComponent } from '@app/pages/administration/administration-page/expense-setting/expense-setting.component';
import { ExpenseSettingPageComponent } from '@app/pages/administration/administration-page/expense-setting/expense-setting-page/expense-setting-page.component';
import { ExpenseSettingRoutingModule } from '@app/pages/administration/administration-page/expense-setting/expense-setting-routing.component.module';

@NgModule({
  imports: [ExpenseSettingRoutingModule, ThemeModule],
  declarations: [ExpenseSettingComponent, ExpenseSettingPageComponent],
  providers: []
})
export class ExpenseSettingModule {}
