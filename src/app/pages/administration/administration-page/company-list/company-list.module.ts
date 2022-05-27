import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { CompanyListComponent } from './company-list.component';
import { CompanyListRoutingModule } from './company-list-routing.module';
import { CompanyListPageComponent } from './company-list-page/company-list-page.component';

@NgModule({
  imports: [CompanyListRoutingModule, SharedModule],
  declarations: [CompanyListComponent, CompanyListPageComponent],
  providers: []
})
export class CompanyListModule {}
