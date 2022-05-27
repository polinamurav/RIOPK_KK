import { RouterModule, Routes } from '@angular/router';

import { ClientsAppComponent } from './clients-app.component';
import { NgModule } from '@angular/core';
import { PathForStage } from '@app/_models';

const routes: Routes = [
  {
    path: '',
    component: ClientsAppComponent,
    children: [
      {
        path: PathForStage.VIEW,
        loadChildren: () => import('./clients-app-root/clients-app-root.module').then(m => m.ClientsAppRootModule)
      },
      {
        path: '',
        redirectTo: PathForStage.VIEW,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsAppRoutingModule {}
