import { NgModule } from '@angular/core';
import { StopListPageComponent } from './stop-list-page/stop-list-page.component';
import { ThemeModule } from '@app/theme/theme.module';
import { StopListComponent } from './stop-list.component';
import { StopListRoutingModule } from './stop-list-routing.module';

@NgModule({
  imports: [ThemeModule, StopListRoutingModule],
  declarations: [StopListComponent, StopListPageComponent],
  providers: []
})
export class StopListModule {}
