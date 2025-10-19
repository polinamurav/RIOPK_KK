import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { CompanyListComponent } from './company-list.component';
import { CompanyListRoutingModule } from './company-list-routing.module';
import { CompanyListPageComponent } from './company-list-page/company-list-page.component';

@NgModule({
  imports: [CompanyListRoutingModule, ThemeModule],
  declarations: [CompanyListComponent, CompanyListPageComponent],
  providers: []
})
export class CompanyListModule {}
