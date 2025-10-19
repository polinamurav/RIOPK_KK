import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { InsuranceConditionComponent } from './insurance-condition.component';
import { InsuranceConditionRoutingModule } from './insurance-condition-routing.component.module';
import { InsuranceConditionPageComponent } from './insurance-condition-page/insurance-condition.component';

@NgModule({
  imports: [InsuranceConditionRoutingModule, ThemeModule],
  declarations: [InsuranceConditionComponent, InsuranceConditionPageComponent],
  providers: []
})
export class InsuranceConditionModule {}
