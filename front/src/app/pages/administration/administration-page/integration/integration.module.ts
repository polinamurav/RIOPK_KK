import { NgModule } from '@angular/core';
import { IntegrationPageComponent } from './integration-page/integration-page.component';
import { IntegrationRoutingModule } from './integration-routing.component.module';
import { ThemeModule } from '@app/theme/theme.module';
import { IntegrationComponent } from './integration.component';

@NgModule({
  imports: [IntegrationRoutingModule, ThemeModule],
  declarations: [IntegrationComponent, IntegrationPageComponent],
  providers: []
})
export class IntegrationModule {}
