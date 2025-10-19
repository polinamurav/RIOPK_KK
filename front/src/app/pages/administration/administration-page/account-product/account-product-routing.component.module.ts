import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountProductPageComponent } from '@app/pages/administration/administration-page/account-product/account-product-page/account-product-page.component';
import { AccountProductComponent } from '@app/pages/administration/administration-page/account-product/account-product.component';

const routes: Routes = [
  {
    path: '',
    component: AccountProductComponent,
    children: [
      {
        path: '',
        component: AccountProductPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountProductRoutingModule {}
