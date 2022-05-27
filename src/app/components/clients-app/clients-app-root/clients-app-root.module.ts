import { AppTabsModule } from '@app/components/tabs.module';
import { ClientsAppRootComponent } from './clients-app-root.component';
import { ClientsAppRootRoutingModule } from './clients-app-root-routing.module';
import { ClientsComponent } from '../clients-component/clients.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [ClientsAppRootComponent, ClientsComponent],
  imports: [SharedModule, AppTabsModule, ClientsAppRootRoutingModule]
})
export class ClientsAppRootModule {}
