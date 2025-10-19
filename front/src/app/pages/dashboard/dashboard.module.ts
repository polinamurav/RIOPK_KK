import { NgModule } from '@angular/core';

import { ThemeModule } from '@app/theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { FilterTableComponent } from './dashboard-page/filter-table/filter-table.component';
import { TabsComponent } from './dashboard-page/tabs/tabs.component';
import { CreditAppComponent } from './dashboard-page/tabs/credit-app/credit-app.component';
import { NotificationsComponent } from './dashboard-page/tabs/notifications/notifications.component';
import { CreditAppTableModalComponent } from './dashboard-page/tabs/credit-app/credit-app-modal/credit-app-table-modal.component';
import { DashboardPageService } from '@app/pages/dashboard/dashboard-page/dashboard-page.service';
import { OtpComponent } from '@app/components/otp/otp.component';
import { BiometricModalComponent } from './dashboard-page/tabs/credit-app/biometric-modal/biometric-modal.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [DashboardRoutingModule, QRCodeModule, ThemeModule, TranslateModule, InlineSVGModule],
  declarations: [
    DashboardComponent,
    DashboardPageComponent,
    FilterTableComponent,
    TabsComponent,
    CreditAppComponent,
    NotificationsComponent,
    CreditAppTableModalComponent,
    OtpComponent,
    BiometricModalComponent
  ],
  exports: [OtpComponent],
  providers: [DashboardPageService]
})
export class DashboardModule {}
