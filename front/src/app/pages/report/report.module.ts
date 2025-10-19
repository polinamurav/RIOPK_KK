import { NgModule } from '@angular/core';
import { ReportComponent } from './report.component';
import { ThemeModule } from '@app/theme/theme.module';
import { ReportRoutingModule } from './report-routing.module';
import { ReportPageComponent } from './report-page/report-page.component';
import { FilterTableComponent } from './report-page/filter-table/filter-table.component';
import { UpraReportComponent } from './report-page/upra-report/upra-report.component';
import { CreateUpraReportModalComponent } from './report-page/upra-report/create-upra-report-modal/create-upra-report-modal.component';
import { ReportOnlineComponent } from './report-page/report-online/report-online.component';
import { ReportPosComponent } from '@app/pages/report/report-page/report-pos/report-pos.component';
import { ReportDataComponent } from '@app/pages/report/report-page/report-data/report-data.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [ReportRoutingModule, ThemeModule, MatCheckboxModule],
  declarations: [
    ReportComponent,
    ReportPageComponent,
    FilterTableComponent,
    UpraReportComponent,
    CreateUpraReportModalComponent,
    ReportOnlineComponent,
    ReportPosComponent,
    ReportDataComponent
  ]
})
export class ReportModule {}
