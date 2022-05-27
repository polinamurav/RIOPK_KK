import { RouterModule, Routes } from '@angular/router';

import { AppOperationModeComponent } from './app-operation-mode-component/app-operation-mode.component';
import { AppOperationModeRootComponent } from './app-operation-mode-root.component';
import { AuthenticationGuard } from '@app/guards/authentication.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AppOperationModeRootComponent,
    children: [
      {
        path: '',
        component: AppOperationModeComponent
      },
      {
        path: 'lending',
        loadChildren: () => import('../pages/lending-pages-module/pages.module').then(m => m.PagesModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('../pages/clients-pages-module/clients-pages.module').then(m => m.ClientsPagesModule),
        canActivate: [AuthenticationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppOperationModeRoutingModule {}
