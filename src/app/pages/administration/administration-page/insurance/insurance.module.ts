import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { InsuranceRoutingModule } from './insurance-routing.component.module';
import { InsuranceComponent } from './insurance.component';
import { InsuranceCompaniesComponent } from './insurance-companies/insurance-companies.component';

@NgModule({
  imports: [InsuranceRoutingModule, SharedModule],
  declarations: [InsuranceComponent, InsuranceCompaniesComponent],
  providers: []
})
export class InsuranceModule {}
