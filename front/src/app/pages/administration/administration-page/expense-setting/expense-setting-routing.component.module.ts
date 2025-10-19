import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseSettingComponent } from '@app/pages/administration/administration-page/expense-setting/expense-setting.component';
import { ExpenseSettingPageComponent } from '@app/pages/administration/administration-page/expense-setting/expense-setting-page/expense-setting-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExpenseSettingComponent,
    children: [
      {
        path: '',
        component: ExpenseSettingPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseSettingRoutingModule {}
