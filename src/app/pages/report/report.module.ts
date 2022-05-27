import { NgModule } from '@angular/core';
import { ReportComponent } from './report.component';
import { SharedModule } from '@app/shared';
import { ReportRoutingModule } from './report-routing.module';
import { ReportPageComponent } from './report-page/report-page.component';
import { FilterTableComponent } from './report-page/filter-table/filter-table.component';

@NgModule({
  imports: [ReportRoutingModule, SharedModule],
  declarations: [ReportComponent, ReportPageComponent, FilterTableComponent]
})
export class ReportModule {}
