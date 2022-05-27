import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardPageComponent
      },
      {
        path: 'stages',
        loadChildren: () => import('../../components/retail-app/retail-app.module').then(m => m.RetailAppModule)
      },
      {
        path: 'mass-segment-stages',
        loadChildren: () =>
          import('../../components/mass-segment-app/mass-segment-app.module').then(m => m.MassSegmentModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
