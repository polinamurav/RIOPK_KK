import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceComponent } from './insurance.component';
import { InsuranceCompaniesComponent } from './insurance-companies/insurance-companies.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceComponent,
    children: [
      {
        path: '',
        component: InsuranceCompaniesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule {}
