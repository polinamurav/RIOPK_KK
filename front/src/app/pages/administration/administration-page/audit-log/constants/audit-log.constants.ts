import { TableDataHeader } from '@app/_models';

export const AUDIT_LOG_HEADERS: TableDataHeader[] = [
  new TableDataHeader(
    'auditEventType.id',
    'Administration.TableHeaders.AuditLog.EventType',
    'string',
    'auditEventType.id'
  ),
  new TableDataHeader('entityName', 'Administration.TableHeaders.AuditLog.EntityName', 'string', 'entityName'),
  new TableDataHeader(
    'entityRecordId',
    'Administration.TableHeaders.AuditLog.EntityRecordId',
    'string',
    'entityRecordId'
  ),
  new TableDataHeader('details', 'Administration.TableHeaders.AuditLog.Details', 'string', 'details'),
  new TableDataHeader('changedByUsername', 'Administration.TableHeaders.ChangedBy', 'string', 'changedByUsername'),
  new TableDataHeader('created', 'Administration.TableHeaders.AuditLog.Created', 'dateAndTime', 'created')
];
