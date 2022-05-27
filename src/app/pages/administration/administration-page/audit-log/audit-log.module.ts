import { AuditLogComponent } from './audit-log-component/audit-log.component';
import { AuditLogParentComponent } from './audit-log-parent.component';
import { AuditLogRoutingModule } from './audit-log-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../../../shared/shared.module';

@NgModule({
  declarations: [AuditLogParentComponent, AuditLogComponent],
  imports: [AuditLogRoutingModule, SharedModule]
})
export class AuditLogModule {}
