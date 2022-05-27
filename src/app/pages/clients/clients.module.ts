import { ClientsPageComponent } from './clients-page/clients-page.component';
import { ClientsPageRootComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { FilterTableComponent } from './clients-page/filter-table/filter-table.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [ClientsPageRootComponent, ClientsPageComponent, FilterTableComponent],
  imports: [ClientsRoutingModule, SharedModule]
})
export class ClientsModule {}
