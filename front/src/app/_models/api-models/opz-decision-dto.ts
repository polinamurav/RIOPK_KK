export interface OpzDecisionDto {
  verifierDecisionId?: string; //  Решение по заявке

  verifierDeclineReasonId?: number; //  Причина отказа по заявке на этапе ОПЗ

  verifierId?: number; //  Id пользователя, который принял решение по заявке
}
