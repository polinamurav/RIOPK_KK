import { NgModule } from '@angular/core';
import { StopListPageComponent } from './stop-list-page/stop-list-page.component';
import { SharedModule } from '@app/shared';
import { StopListComponent } from './stop-list.component';
import { StopListRoutingModule } from './stop-list-routing.module';

@NgModule({
  imports: [SharedModule, StopListRoutingModule],
  declarations: [StopListComponent, StopListPageComponent],
  providers: []
})
export class StopListModule {}
