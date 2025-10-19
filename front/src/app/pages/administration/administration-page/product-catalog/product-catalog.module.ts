import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { ProductCatalogRoutingModule } from './product-catalog-routing.component.module';
import { ProductCatalogComponent } from './product-catalog.component';
import { ProductCatalogPageComponent } from './reports-page/product-catalog.component';

@NgModule({
  imports: [ProductCatalogRoutingModule, ThemeModule],
  declarations: [ProductCatalogComponent, ProductCatalogPageComponent],
  providers: []
})
export class ProductCatalogModule {}
