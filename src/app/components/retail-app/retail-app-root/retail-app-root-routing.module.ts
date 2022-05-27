import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RetailAppRootComponent } from './retail-app-root.component';
import { RetailComponent } from '../retail-app-component/retail.component';
import { StageCanActivateChildGuard } from '@app/guards/state-can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: RetailAppRootComponent,
    canActivateChild: [StageCanActivateChildGuard],
    children: [
      {
        path: ':id/:hash',
        component: RetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [StageCanActivateChildGuard]
})
export class RetailAppRootRoutingModule {}
