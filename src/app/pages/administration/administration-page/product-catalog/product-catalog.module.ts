import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ProductCatalogRoutingModule } from './product-catalog-routing.component.module';
import { ProductCatalogComponent } from './product-catalog.component';
import { ProductCatalogPageComponent } from './reports-page/product-catalog.component';

@NgModule({
  imports: [ProductCatalogRoutingModule, SharedModule],
  declarations: [ProductCatalogComponent, ProductCatalogPageComponent],
  providers: []
})
export class ProductCatalogModule {}
