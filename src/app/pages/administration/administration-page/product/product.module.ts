import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductRoutingModule } from './product-routing.component.module';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [ProductRoutingModule, SharedModule],
  declarations: [ProductComponent, ProductPageComponent],
  providers: []
})
export class ProductModule {}
