import { NgModule } from '@angular/core';
import { IntegrationLogPageComponent } from './integration-log-page/integration-log-page.component';
import { SharedModule } from '@app/shared';
import { IntegrationLogComponent } from './integration-log.component';
import { IntegrationLogRoutingModule } from './integration-log-routing.module';

@NgModule({
  imports: [SharedModule, IntegrationLogRoutingModule],
  declarations: [IntegrationLogComponent, IntegrationLogPageComponent],
  providers: []
})
export class IntegrationLogModule {}
