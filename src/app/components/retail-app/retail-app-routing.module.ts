import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PathForStage } from '@app/_models';
import { RetailAppComponent } from './retail-app.component';

const routes: Routes = [
  {
    path: '',
    component: RetailAppComponent,
    children: [
      {
        path: PathForStage.FULL_FORM,
        loadChildren: () => import('./retail-app-root/retail-app-root.module').then(m => m.RetailAppRootModule)
      },
      {
        path: PathForStage.VERIFICATION,
        loadChildren: () => import('./retail-app-root/retail-app-root.module').then(m => m.RetailAppRootModule)
      },
      {
        path: PathForStage.DECISION_MAKING,
        loadChildren: () => import('./retail-app-root/retail-app-root.module').then(m => m.RetailAppRootModule)
      },
      {
        path: PathForStage.DECISION_FINAL,
        loadChildren: () => import('./retail-app-root/retail-app-root.module').then(m => m.RetailAppRootModule)
      },
      {
        path: PathForStage.PAPERWORK,
        loadChildren: () => import('./retail-app-root/retail-app-root.module').then(m => m.RetailAppRootModule)
      },
      {
        path: PathForStage.ACCEPTANCE,
        loadChildren: () => import('./retail-app-root/retail-app-root.module').then(m => m.RetailAppRootModule)
      },
      {
        path: PathForStage.VIEW,
        loadChildren: () => import('./retail-app-root/retail-app-root.module').then(m => m.RetailAppRootModule)
      },
      {
        path: '',
        redirectTo: PathForStage.FULL_FORM,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RetailAppRoutingModule {}
