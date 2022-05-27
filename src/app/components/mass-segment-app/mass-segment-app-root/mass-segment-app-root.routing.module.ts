import { RouterModule, Routes } from '@angular/router';

import { MassSegmentAppComponent } from '../mass-segment-app-component/mass-segment-app.component';
import { MassSegmentAppRootComponent } from './mass-segment-app-root.component';
import { NgModule } from '@angular/core';
import { StageCanActivateChildGuard } from '@app/guards/state-can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: MassSegmentAppRootComponent,
    // canActivateChild: [StageCanActivateChildGuard],
    children: [
      {
        path: ':id/:hash',
        component: MassSegmentAppComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [StageCanActivateChildGuard]
})
export class MassSegmentAppRootRoutingModule {}
