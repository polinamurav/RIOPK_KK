import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { FilterTableComponent } from './report-page/filter-table/filter-table.component';

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
            path: ':title',
            component: FilterTableComponent
          },
          { path: '', redirectTo: '001', pathMatch: 'full' }
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
