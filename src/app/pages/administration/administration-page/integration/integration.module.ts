import { NgModule } from '@angular/core';
import { IntegrationPageComponent } from './integration-page/integration-page.component';
import { IntegrationRoutingModule } from './integration-routing.component.module';
import { SharedModule } from '@app/shared';
import { IntegrationComponent } from './integration.component';

@NgModule({
  imports: [IntegrationRoutingModule, SharedModule],
  declarations: [IntegrationComponent, IntegrationPageComponent],
  providers: []
})
export class IntegrationModule {}
