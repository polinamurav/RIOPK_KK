import { NgModule } from '@angular/core';
import { IntegrationLogPageComponent } from './integration-log-page/integration-log-page.component';
import { ThemeModule } from '@app/theme/theme.module';
import { IntegrationLogComponent } from './integration-log.component';
import { IntegrationLogRoutingModule } from './integration-log-routing.module';

@NgModule({
  imports: [ThemeModule, IntegrationLogRoutingModule],
  declarations: [IntegrationLogComponent, IntegrationLogPageComponent],
  providers: []
})
export class IntegrationLogModule {}
