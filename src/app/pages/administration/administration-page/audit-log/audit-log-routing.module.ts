import { RouterModule, Routes } from '@angular/router';

import { AuditLogComponent } from './audit-log-component/audit-log.component';
import { AuditLogParentComponent } from './audit-log-parent.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AuditLogParentComponent,
    children: [
      {
        path: '',
        component: AuditLogComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditLogRoutingModule {}
