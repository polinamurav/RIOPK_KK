import { CommissionConfigComponent } from './commission-config-component/commission-config.component';
import { CommissionConfigParentComponent } from './commission-config-parent.component';
import { CommissionConfigRoutingModule } from './commission-config-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [CommissionConfigParentComponent, CommissionConfigComponent],
  imports: [CommissionConfigRoutingModule, SharedModule]
})
export class CommissionConfigModule {}
