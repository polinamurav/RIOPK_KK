import { ClientsPagesModuleComponent } from './clients-pages-module.component';
import { ClientsPagesModuleRoutingModule } from './clients-pages-module-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [ClientsPagesModuleComponent],
  imports: [SharedModule, ClientsPagesModuleRoutingModule]
})
export class ClientsPagesModule {}
