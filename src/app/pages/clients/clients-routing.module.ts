import { RouterModule, Routes } from '@angular/router';

import { ClientsPageComponent } from './clients-page/clients-page.component';
import { ClientsPageRootComponent } from './clients.component';
import { FilterTableComponent } from './clients-page/filter-table/filter-table.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ClientsPageRootComponent,
    children: [
      {
        path: '',
        component: ClientsPageComponent,
        children: [
          {
            path: ':title',
            component: FilterTableComponent
          },
          { path: '', redirectTo: 'all', pathMatch: 'full' }
        ]
      },
      {
        path: 'client-data',
        loadChildren: () => import('../../components/clients-app/clients-app.module').then(m => m.ClientsAppModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
