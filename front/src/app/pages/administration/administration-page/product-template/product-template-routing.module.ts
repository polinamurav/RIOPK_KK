import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductTemplateComponent } from '@app/pages/administration/administration-page/product-template/product-template/product-template.component';
import { ProductTemplatePageComponent } from '@app/pages/administration/administration-page/product-template/product-template-page/product-template-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductTemplateComponent,
    children: [
      {
        path: '',
        component: ProductTemplatePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductTemplateRoutingModule {}
