import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { AdministrationComponent } from './administration.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationPageComponent } from './administration-page/administration-page.component';

@NgModule({
  imports: [AdministrationRoutingModule, SharedModule],
  declarations: [AdministrationComponent, AdministrationPageComponent],
  providers: []
})
export class AdministrationModule {}
