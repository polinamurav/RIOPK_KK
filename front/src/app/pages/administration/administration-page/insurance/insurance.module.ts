import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { InsuranceRoutingModule } from './insurance-routing.component.module';
import { InsuranceComponent } from './insurance.component';
import { InsuranceCompaniesComponent } from './insurance-companies/insurance-companies.component';

@NgModule({
  imports: [InsuranceRoutingModule, ThemeModule],
  declarations: [InsuranceComponent, InsuranceCompaniesComponent],
  providers: []
})
export class InsuranceModule {}
