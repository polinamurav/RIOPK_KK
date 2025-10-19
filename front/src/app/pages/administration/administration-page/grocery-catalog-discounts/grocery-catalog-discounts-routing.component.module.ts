import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceryCatalogDiscountsComponent } from './grocery-catalog-discounts.component';
import { GroceryCatalogDiscountsPageComponent } from './reports-page/grocery-catalog-discounts.component';

const routes: Routes = [
  {
    path: '',
    component: GroceryCatalogDiscountsComponent,
    children: [
      {
        path: '',
        component: GroceryCatalogDiscountsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroceryCatalogDiscountsRoutingModule {}
