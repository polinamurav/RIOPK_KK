import { NgModule } from '@angular/core';

import { ThemeModule } from '@app/theme/theme.module';
import { QueuesComponent } from './queues.component';
import { QueuesRoutingModule } from './queues-routing.module';
import { QueuesPageComponent } from './queues-page/queues-page.component';
import { FilterTableComponent } from './queues-page/filter-table/filter-table.component';
import { QueueErrorModalComponent } from './queues-page/queue-error-modal/queue-error-modal.component';

@NgModule({
  imports: [QueuesRoutingModule, ThemeModule],
  declarations: [QueuesComponent, QueuesPageComponent, FilterTableComponent, QueueErrorModalComponent],
  providers: []
})
export class QueuesModule {}
