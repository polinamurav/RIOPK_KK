import { DebtpDto } from '..';

export class InternalCreditHistoryDto {
  applicantId: number;
  applicationId: number;
  clnId: number;
  created: string;
  id: number;
  internalBails: InternalBailDto[];
  internalCredits: InternalCreditDto[];
  updated: string;
}

export class InternalBailDto {
  clnDataName: string;
  clnDataPin: string;
  clnId: number;
  created: string;
  date: string;
  id: number;
  internalCredits: InternalCreditDto[];
  numDog: string;
  state: string;
  updated: string;
}

export class InternalCreditDto {
  ccy: string;
  created: string;
  creditLimit: number;
  dateBegin: string;
  dateClose: string;
  dateEnd: string;
  debtiSet: DebtpDto[];
  debtpSet: DebtpDto[];
  id: number;
  internalId: number;
  internalPawnDtos: InternalPawnDto[];
  internalPlans: InternalPlanDto[];
  kindCreditsIsForCredCard: number;
  kindCreditsName: string;
  kredit: number;
  limitSaldo: number;
  loan4Front: number;
  neuchtenProcenty: number;
  numDog: string;
  peny: number;
  prosrochKredit: number;
  prosrochProcenty: number;
  restr: number;
  state: string;
  summaDog: number;
  uchtenProcenty: number;
  updated: string;
}

export class InternalPawnDto {
  numDog: string;
  part: number;
  summa: number;
  userZalogName: string;
  userZalogPin: string;
  vidGuarantee: string;
}

export class InternalPlanDto {
  created: string;
  date: string;
  id: number;
  updated: string;
  value: number;
}

export class AbsClientCardDto {
  applicantId: number;
  applicationId: number;
  company: string;
  count: number;
  created: string;
  firstCard: string;
  id: number;
  updated: string;
}
