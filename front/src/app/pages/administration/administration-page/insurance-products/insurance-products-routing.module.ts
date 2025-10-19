import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceProductsComponent } from '@app/pages/administration/administration-page/insurance-products/insurance-products.component';
import { InsuranceProductsPageComponent } from '@app/pages/administration/administration-page/insurance-products/insurance-products-page/insurance-products-page.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceProductsComponent,
    children: [
      {
        path: '',
        component: InsuranceProductsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceProductsRoutingModule {}
