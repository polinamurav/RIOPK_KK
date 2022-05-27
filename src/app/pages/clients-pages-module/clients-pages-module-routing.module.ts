import { RouterModule, Routes } from '@angular/router';

import { ClientsPageGuard } from '@app/guards/clients-page.guard';
import { ClientsPagesModuleComponent } from './clients-pages-module.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ClientsPagesModuleComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../clients/clients.module').then(m => m.ClientsModule),
        canActivate: [ClientsPageGuard]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsPagesModuleRoutingModule {}
