import { LocalNames } from '..';

export class RoleDto implements LocalNames {
  authority: string;
  code: string;
  id: number;
  nameRu: string;
  nameGe: string;
  nameEn: string;
}

export enum RoleAuthority {
  ADMIN = 'ADMIN',
  CREDIT_MANAGER = 'CREDIT_MANAGER',
  CALL_CENTER = 'CALL_CENTER',
  VERIFIER = 'VERIFIER',
  AUDITOR = 'AUDITOR',
  CREDIT_MANAGER_BOSS = 'CREDIT_MANAGER_BOSS',
  CALL_CENTER_BOSS = 'CALL_CENTER_BOSS',
  DECISION_MAKER = 'DECISION_MAKER',
  SALES_DEP = 'SALES_DEP',
  DSA = 'DSA',
  DSA_BOSS = 'DSA_BOSS',
  VIDEO_BANK = 'VIDEO_BANK',
  VIDEO_BANK_BOSS = 'VIDEO_BANK_BOSS',
  DECISION_MAKER_BOSS = 'DECISION_MAKER_BOSS',
  VERIFIER_BOSS = 'VERIFIER_BOSS',
  ARCHIVIST = 'ARCHIVIST'
}
