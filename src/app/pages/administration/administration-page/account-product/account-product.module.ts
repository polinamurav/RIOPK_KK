import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {AccountProductRoutingModule} from "@app/pages/administration/administration-page/account-product/account-product-routing.component.module";
import {AccountProductComponent} from "@app/pages/administration/administration-page/account-product/account-product.component";
import {AccountProductPageComponent} from "@app/pages/administration/administration-page/account-product/account-product-page/account-product-page.component";

@NgModule({
  imports: [AccountProductRoutingModule, SharedModule],
  declarations: [AccountProductComponent, AccountProductPageComponent],
  providers: []
})
export class AccountProductModule {}
