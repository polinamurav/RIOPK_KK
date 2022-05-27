import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { FilterTableComponent } from './dashboard-page/filter-table/filter-table.component';
import { TabsComponent } from './dashboard-page/tabs/tabs.component';
import { CreditAppComponent } from './dashboard-page/tabs/credit-app/credit-app.component';
import { NotificationsComponent } from './dashboard-page/tabs/notifications/notifications.component';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule, TranslateModule, InlineSVGModule],
  declarations: [
    DashboardComponent,
    DashboardPageComponent,
    FilterTableComponent,
    TabsComponent,
    CreditAppComponent,
    NotificationsComponent
  ],
  providers: []
})
export class DashboardModule {}
