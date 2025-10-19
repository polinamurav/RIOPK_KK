import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { InsuranceProductsRoutingModule } from './insurance-products-routing.module';
import { InsuranceProductsComponent } from '@app/pages/administration/administration-page/insurance-products/insurance-products.component';
import { InsuranceProductsPageComponent } from '@app/pages/administration/administration-page/insurance-products/insurance-products-page/insurance-products-page.component';

@NgModule({
  imports: [InsuranceProductsRoutingModule, ThemeModule],
  declarations: [InsuranceProductsComponent, InsuranceProductsPageComponent],
  providers: []
})
export class InsuranceProductsModule {}
