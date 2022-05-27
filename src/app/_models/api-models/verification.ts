import {Company, CreditInfo, Decision, Dir, DirChecklist, DirectoryVal, SystemDirectory, User, UserDto} from '..';

import {BRMS4ResponseDto, BRMSResponseDto} from './brms';
import {getId} from "@app/services/util/getId";

export class VerificationFrontDtoGet {
  verification: VerificationGetDto;
  verificationEmployments: VerificationEmployment[];
}

export class VerificationFrontDtoPost {
  verification: VerificationPostDto;
  verificationEmployments: VerificationEmployment[];
  verificationPhones?: VerificationPhone[];
}

export class VerificationGetDto {
  applicantId: number;
  applicationId: number;
  brms4Response: BRMS4ResponseDto;
  comment: string;
  created: string | Date;
  decisionMaker: User;
  dirDecisionMakerDeclineReason: Dir;
  dirVerifierDecisionId: Decision;
  expenses: number;
  id: number;
  income: number;
  limitUnder: number;
  updated: string | Date;
  verificationDone: boolean;
  verifier: User;
}

export class VerificationPostDto {
  applicantId: number;
  applicationId: number;
  comment: string;
  created: string | Date;
  decisionMaker: User;
  dirDecisionMakerDeclineReasonId: number;
  dirVerifierDecisionId: string;
  expenses: number;
  id: number;
  income: number;
  limitUnder: number;
  updated: string | Date;
  verificationDone: boolean;
  verifier: User;

  constructor(obj: VerificationGetDto) {
    this.applicantId = obj.applicantId;
    this.applicationId = obj.applicationId;
    this.comment = obj.comment;
    this.created = obj.created;
    this.decisionMaker = obj.decisionMaker;
    this.dirDecisionMakerDeclineReasonId = getId(obj.dirDecisionMakerDeclineReason);
    this.dirVerifierDecisionId = getId(obj.dirVerifierDecisionId);
    this.expenses = obj.expenses;
    this.id = obj.id;
    this.income = obj.income;
    this.limitUnder = obj.limitUnder;
    this.updated = obj.updated;
    this.verificationDone = obj.verificationDone;
    this.verifier = obj.verifier;
  }
}

export class VerificationPer {
  applicantId: number;
  applicationId: number;
  created: string;
  income: number;
  expenses: number;
  id: number;
  verifierId: number;
  updated: string;
  decisionMaker: UserDto;
  verificationDone: boolean;
}

export class Verification extends VerificationPer {
  brms4Response: BRMSResponseDto;
  dirVerifierDecision: SystemDirectory;
  dirDecisionMakerDecisionId: DirDecisionMakerDecision;
  dirDecisionMakerDeclineReasonId: DirDecisionMakerDeclineReason;
  comment?: string;
}

export class DirDecisionMakerDecision {
  id: number;
  name: number;
}

export class DirDecisionMakerDeclineReason {
  active: boolean;
  changedBy: number;
  code: string;
  created: string;
  id: number;
  name: number;
  updated: string;
  value: string;
}

export class VerificationRes extends VerificationPer {
  dirDecisionMakerDecisionId: number;
  dirDecisionMakerDeclineReasonId: number;
}

export class VerificationDto {
  verification: Verification;
  verificationChecklists?: VerificationChecklist[];
  verificationEmployments: VerificationEmployment[];
  verificationPhones?: VerificationPhone[];
}

export class VerificationChecklist {
  applicantId: number;
  applicationId: number;
  created: string | Date;
  dirChecklist: DirChecklist;
  id: number;
  result: boolean;
  updated: string | Date;
  verificationId: number;
}

export class VerificationEmployment {
  applicantId: number;
  applicantIncomeId: number;
  applicationId: number;
  comment: string;
  companyStatusId: string;
  created: string | Date;
  emplInn: string;
  emplName: string;
  id: number;
  initialCompanyStatusId: string;
  updated: string | Date;
  verificationId: number;
  company: Company;
}

export class VerificationEmploymentDto {
  applicantId: number;
  applicantIncomeId: number;
  applicationId: number;
  comment: string;
  companyStatusId: string;
  created: string | Date;
  emplInn: string;
  emplName: string;
  id: number;
  initialCompanyStatusId: string;
  updated: string | Date;
  verificationId: number;
}

export class VerificationPhone {
  applicantId: number;
  applicationId: number;
  callStatusId: number;
  comment: string;
  created: string | Date;
  employmentConfirmedBy?: string;
  id: number;
  name: string;
  phone: string;
  role: string;
  updated: string | Date;
  verificationId: number;
}
