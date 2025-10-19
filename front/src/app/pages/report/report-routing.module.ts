import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { FilterTableComponent } from './report-page/filter-table/filter-table.component';
import {UpraReportComponent} from "@app/pages/report/report-page/upra-report/upra-report.component";
import {ReportOnlineComponent} from "@app/pages/report/report-page/report-online/report-online.component";
import { ReportPosComponent } from '@app/pages/report/report-page/report-pos/report-pos.component';
import { ReportDataComponent } from '@app/pages/report/report-page/report-data/report-data.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      {
        path: '',
        component: ReportPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'upra',
            pathMatch: 'full'
          },
          {
            path: 'upra',
            component: UpraReportComponent
          },
          {
            path: 'online-report',
            component: ReportOnlineComponent
          },
          {
            path: 'pos-report',
            component: ReportPosComponent
          },
          {
            path: 'data-report',
            component: ReportDataComponent
          },
          {
            path: ':title',
            component: FilterTableComponent
          },

        ]
      },
      {
        path: 'stages',
        loadChildren: () => import('../../components/retail-app/retail-app.module').then(m => m.RetailAppModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
