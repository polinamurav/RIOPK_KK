import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatalogComponent } from './product-catalog.component';
import { ProductCatalogPageComponent } from './reports-page/product-catalog.component';

const routes: Routes = [
  {
    path: '',
    component: ProductCatalogComponent,
    children: [
      {
        path: '',
        component: ProductCatalogPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCatalogRoutingModule {}
