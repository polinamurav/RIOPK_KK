import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { GroceryCatalogDiscountsComponent } from '@app/pages/administration/administration-page/grocery-catalog-discounts/grocery-catalog-discounts.component';
import { GroceryCatalogDiscountsPageComponent } from '@app/pages/administration/administration-page/grocery-catalog-discounts/reports-page/grocery-catalog-discounts.component';
import { GroceryCatalogDiscountsRoutingModule } from '@app/pages/administration/administration-page/grocery-catalog-discounts/grocery-catalog-discounts-routing.component.module';

@NgModule({
  imports: [GroceryCatalogDiscountsRoutingModule, ThemeModule],
  declarations: [GroceryCatalogDiscountsComponent, GroceryCatalogDiscountsPageComponent],
  providers: []
})
export class GroceryCatalogDiscountsModule {}
