import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ProductDiscountComponent } from './product-discount-component/product-discount.component';
import { ProductDiscountParentComponent } from './product-discount-parent.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDiscountParentComponent,
    children: [
      {
        path: '',
        component: ProductDiscountComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDiscountRoutingModule {}
