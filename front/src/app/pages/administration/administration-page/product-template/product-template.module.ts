import { NgModule } from '@angular/core';
import { ProductTemplateComponent } from './product-template/product-template.component';
import { ProductTemplatePageComponent } from './product-template-page/product-template-page.component';
import { ProductTemplateRoutingModule } from '@app/pages/administration/administration-page/product-template/product-template-routing.module';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  declarations: [ProductTemplateComponent, ProductTemplatePageComponent],
  imports: [ThemeModule, ProductTemplateRoutingModule]
})
export class ProductTemplateModule {}
