import { RouterModule, Routes } from '@angular/router';

import { CommissionConfigComponent } from './commission-config-component/commission-config.component';
import { CommissionConfigParentComponent } from './commission-config-parent.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: CommissionConfigParentComponent,
    children: [
      {
        path: '',
        component: CommissionConfigComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionConfigRoutingModule {}
