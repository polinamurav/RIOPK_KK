import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { QueuesComponent } from './queues.component';
import { QueuesRoutingModule } from './queues-routing.module';
import { QueuesPageComponent } from './queues-page/queues-page.component';
import { FilterTableComponent } from './queues-page/filter-table/filter-table.component';

@NgModule({
  imports: [QueuesRoutingModule, SharedModule],
  declarations: [QueuesComponent, QueuesPageComponent, FilterTableComponent],
  providers: []
})
export class QueuesModule {}
