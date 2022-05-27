import { NgModule } from '@angular/core';
import { ProductDiscountComponent } from './product-discount-component/product-discount.component';
import { ProductDiscountParentComponent } from './product-discount-parent.component';
import { ProductDiscountRoutingModule } from './product-discount-routing.module';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [ProductDiscountParentComponent, ProductDiscountComponent],
  imports: [ProductDiscountRoutingModule, SharedModule]
})
export class ProductDiscountModule {}
