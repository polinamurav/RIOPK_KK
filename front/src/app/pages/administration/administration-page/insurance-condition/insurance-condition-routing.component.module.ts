import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceConditionPageComponent } from './insurance-condition-page/insurance-condition.component';
import { InsuranceConditionComponent } from './insurance-condition.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceConditionComponent,
    children: [
      {
        path: '',
        component: InsuranceConditionPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceConditionRoutingModule {}
