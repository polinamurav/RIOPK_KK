import { BaseDir } from './directory';

export class AuditLog {
  auditEventType: AuditEventType;
  changedByUsername: string;
  created: string;
  details: string;
  entityName: string;
  entityRecordId: string;
  id: number;
}

export class AuditEventType extends BaseDir {
  id: string;
  eventTypeOn: boolean;
}
