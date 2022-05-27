import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { InsuranceConditionComponent } from './insurance-condition.component';
import { InsuranceConditionRoutingModule } from './insurance-condition-routing.component.module';
import { InsuranceConditionPageComponent } from './insurance-condition-page/insurance-condition.component';

@NgModule({
  imports: [InsuranceConditionRoutingModule, SharedModule],
  declarations: [InsuranceConditionComponent, InsuranceConditionPageComponent],
  providers: []
})
export class InsuranceConditionModule {}
