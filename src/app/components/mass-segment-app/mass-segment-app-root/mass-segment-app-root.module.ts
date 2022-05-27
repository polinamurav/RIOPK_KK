import { AppTabsModule } from '@app/components/tabs.module';
import { MassSegmentAppComponent } from '../mass-segment-app-component/mass-segment-app.component';
import { MassSegmentAppRootComponent } from './mass-segment-app-root.component';
import { MassSegmentAppRootRoutingModule } from './mass-segment-app-root.routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [MassSegmentAppRootRoutingModule, SharedModule, AppTabsModule],

  declarations: [MassSegmentAppRootComponent, MassSegmentAppComponent]
})
export class MassSegmentAppRootModule {}
