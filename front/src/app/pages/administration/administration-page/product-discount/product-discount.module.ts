import { NgModule } from '@angular/core';
import { ProductDiscountComponent } from './product-discount-component/product-discount.component';
import { ProductDiscountParentComponent } from './product-discount-parent.component';
import { ProductDiscountRoutingModule } from './product-discount-routing.module';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  declarations: [ProductDiscountParentComponent, ProductDiscountComponent],
  imports: [ProductDiscountRoutingModule, ThemeModule]
})
export class ProductDiscountModule {}
