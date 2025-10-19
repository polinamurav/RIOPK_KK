import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';
import { PrioritizationRoutingModule } from './prioritization-routing.module';
import { PrioritizationComponent } from './prioritization.component';
import { PrioritizatuionPageComponent } from './prioritizatuion-page/prioritizatuion-page.component';

@NgModule({
  imports: [PrioritizationRoutingModule, ThemeModule],
  declarations: [PrioritizationComponent, PrioritizatuionPageComponent],
  providers: []
})
export class PrioritizationListModule {}
