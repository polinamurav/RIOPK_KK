import { RouterModule, Routes } from '@angular/router';

import { MassSegmentAppComponent } from './mass-segment-app.component';
import { NgModule } from '@angular/core';
import { PathForStage } from '@app/_models';

const routes: Routes = [
  {
    path: '',
    component: MassSegmentAppComponent,
    children: [
      {
        path: PathForStage.FULL_FORM,
        loadChildren: () =>
          import('./mass-segment-app-root/mass-segment-app-root.module').then(m => m.MassSegmentAppRootModule)
      },
      {
        path: PathForStage.INSPECTION,
        loadChildren: () =>
          import('./mass-segment-app-root/mass-segment-app-root.module').then(m => m.MassSegmentAppRootModule)
      },
      {
        path: PathForStage.VERIFICATION,
        loadChildren: () =>
          import('./mass-segment-app-root/mass-segment-app-root.module').then(m => m.MassSegmentAppRootModule)
      },
      {
        path: PathForStage.DECISION_FINAL,
        loadChildren: () =>
          import('./mass-segment-app-root/mass-segment-app-root.module').then(m => m.MassSegmentAppRootModule)
      },
      {
        path: PathForStage.VIEW,
        loadChildren: () =>
          import('./mass-segment-app-root/mass-segment-app-root.module').then(m => m.MassSegmentAppRootModule)
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
export class MassSegmentAppRoutingModule {}
