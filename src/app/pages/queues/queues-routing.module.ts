import { RouterModule, Routes } from '@angular/router';

import { FilterTableComponent } from './queues-page/filter-table/filter-table.component';
import { NgModule } from '@angular/core';
import { QueuesComponent } from './queues.component';
import { QueuesPageComponent } from './queues-page/queues-page.component';

const routes: Routes = [
  {
    path: '',
    component: QueuesComponent,
    children: [
      {
        path: '',
        component: QueuesPageComponent,
        children: [
          {
            path: ':title',
            component: FilterTableComponent
          },
          { path: '', redirectTo: 'all', pathMatch: 'full' }
        ]
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
export class QueuesRoutingModule {}
