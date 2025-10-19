import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductRoutingModule } from './product-routing.component.module';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [ProductRoutingModule, ThemeModule],
  declarations: [ProductComponent, ProductPageComponent],
  providers: []
})
export class ProductModule {}
