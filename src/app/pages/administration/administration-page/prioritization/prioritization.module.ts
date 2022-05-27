import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { PrioritizationRoutingModule } from './prioritization-routing.module';
import { PrioritizationComponent } from './prioritization.component';
import { PrioritizatuionPageComponent } from './prioritizatuion-page/prioritizatuion-page.component';

@NgModule({
  imports: [PrioritizationRoutingModule, SharedModule],
  declarations: [PrioritizationComponent, PrioritizatuionPageComponent],
  providers: []
})
export class PrioritizationListModule {}
