import { RouterModule, Routes } from '@angular/router';

import { ClientsAppRootComponent } from './clients-app-root.component';
import { ClientsComponent } from '../clients-component/clients.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ClientsAppRootComponent,
    children: [
      {
        path: ':id/:hash',
        component: ClientsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsAppRootRoutingModule {}
