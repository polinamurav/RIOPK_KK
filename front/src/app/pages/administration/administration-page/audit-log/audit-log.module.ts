import { AuditLogComponent } from './audit-log-component/audit-log.component';
import { AuditLogParentComponent } from './audit-log-parent.component';
import { AuditLogRoutingModule } from './audit-log-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  declarations: [AuditLogParentComponent, AuditLogComponent],
  imports: [AuditLogRoutingModule, ThemeModule]
})
export class AuditLogModule {}
