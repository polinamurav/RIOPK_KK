import { AcbLiabilityDto, DirCurrency, ProductRes } from '..';
import { BaseDir, Dir } from './directory';

export class BRMSResponse {
  annPayment: number;
  annPaymentForAutoApproveSum: number;
  applicationId: number;
  autoApproveSum: number;
  code: string;
  created: Date | string;
  currency: string;
  id: number;
  maxCreditSum: number;
  maxCreditTerm: number;
  minTerm: number;
  minTermForAutoApproveSum: number;
  productType: string;
  rate: number;
  rateForAutoApproveSum: number;
  reasonCode: string;
  updated: Date | string;
  params: string;
}

export class BrmsResponse {
  annPayment: number;
  annPaymentAlt: number;
  applicationId: number;
  brmsDecision: BRMSDto;
  code: string;
  created: string;
  id: number;
  maxSum: number;
  maxSumAlt: number;
  maxTerm: number;
  maxTermAlt: number;
  params: string;
  reasonCode: string;
  updated: string;
}

export class BRMSResponseDto {
  applicationId: number;
  brmsDecision: BRMSDto;
  code?: string;
  created: string;
  id: number;
  params?: string;
  reasonCode?: string;
  updated: string;
}

export class BRMS1ResponseDto extends BRMSResponseDto {
  brms1ResponseRules: BRMSResponseRulesDto[];
  maxTerm: number;
  isReturnClient: boolean;
  isSalaryClient: boolean;
  insider: boolean;
}

export class BRMS2ResponseDto extends BRMSResponseDto {
  annPayment?: number;
  annPaymentAlt?: number;
  brms2Matrices?: BRMS2Matrix[];
  brms2ResponseRules?: BRMS2ResponseRules[];
  maxSum?: number;
  maxSumAlt?: number;
  maxTermAlt?: number;
  acur: number;
  acur2: number;
  cred12Ext: number;
  credAllExt: number;
  debtToAmountExt: number;
  debtToLimitExt: number;
  dti: number;
  dti2: number;
  dtiDecl: number;
  dtiDecl2: number;
  incomeConf: number;
  incomeNet: number;
  incomeNet2: number;
  isEmplConfirmationNeeded: boolean;
  isIncomeConfirmationNeeded: boolean;
  numberEmployerAsan: number;
  numberGuaExt: number;
  segment: BRMSDto;
  segmentGroup: BRMSDto;
  sumNonCollateral: number;
  brms?: string;
}

export class BRMS3ResponseDto extends BRMSResponseDto {
  brms3ResponseRules: BRMS3ResponseRules[];
  brms?: string;
}

export class BRMS4ResponseDto extends BRMSResponseDto {
  segment: BRMSDto;
  brms4Matrices: BRMS2Matrix[];
  brms4ResponseRules: BRMS4ResponseRules[];
}

export class BRMS5ResponseDto extends BRMSResponseDto {
  acur: number;
  acur2: number;
  brms5ResponseRules: BRMS5ResponseRules[];
  cred12Ext: number;
  credAllExt: number;
  debtToAmountExt: number;
  debtToLimitExt: number;
  dti: number;
  dti2: number;
  incomeBrms5: number;
  isOverdue6: boolean;
  numberGuaExt: number;
  segment: BRMSDto;
  segmentGroup: BRMSDto;
  sumNonCollateral: number;
}

export class BRMSResponseRulesDto {
  brmsRule: BRMSRule;
  description: string;
  id: number;
}

export class BRMS1ResponseRules extends BRMSResponseRulesDto {
  brms1Response: BRMS1ResponseDto;
}

export class BRMS2ResponseRules extends BRMSResponseRulesDto {
  brms2Response: BrmsResponse;
}

export class BRMS3ResponseRules extends BRMSResponseRulesDto {
  brms3Response: BRMSResponseDto;
}

export class BRMS4ResponseRules extends BRMSResponseRulesDto {
  brms4Response: BRMSResponseDto;
}

export class BRMS5ResponseRules extends BRMSResponseRulesDto {
  brms5Response: BRMSResponseDto;
}

export class BRMSRule {
  active: boolean;
  brmsRuleType: BRMSDto;
  changedBy: number;
  created: string;
  id: string;
  isVisibleForManager: boolean;
  name: string;
  updated: string;
}

export class BRMSDto extends BaseDir {
  id: string;
}

export class BRMSMatrix {
  applicationId: number;
  brmsMatrixConditionType: BRMSDto;
  creditSum: number;
  creditTerm: number;
  dirCurrency: Dir;
  freshMoney: number;
  id: number;
  incomeDti: number;
  incomeNet: number;
  maxAnnPayment: number;
  maxCreditSum: number;
  maxCreditTerm: number;
  product: ProductRes;
  rate: number;
  rateParam?: number;
  ref10AcbLiabilityId: number;
  ref1AcbLiabilityId: number;
  ref2AcbLiabilityId: number;
  ref3AcbLiabilityId: number;
  ref4AcbLiabilityId: number;
  ref5AcbLiabilityId: number;
  ref6AcbLiabilityId: number;
  ref7AcbLiabilityId: number;
  ref8AcbLiabilityId: number;
  ref9AcbLiabilityId: number;
  coefDti: number;
  creditRefPayment: number;
  debtForRefinance: number;
  dtiAfterScoring: number;
  gracePeriod: number;
  overpayPrepaymentRate?: number;
  issueFee?: number;
  expenseDti: number;
  altRate: number;
  restructureFee: number;
  prepaymentRate: number;
  paymentInOtherBankRate: number;
  creditInfoId: number;
}

export class BRMS2Matrix extends BRMSMatrix {
  brms2Response?: BrmsResponse;
}
export class BRMS4Matrix extends BRMSMatrix {
  brms4Response: BRMSResponseDto;
}
export class BRMSFinalMatrix extends BRMSMatrix {}

export class BRMSMatrixDto {
  altRate: number;
  annPayment: number;
  applicationId: number;
  brmsMatrixConditionType: BRMSDto;
  creditRefPayment: number;
  creditSum: number;
  creditTerm: number;
  debtForRefinance: number;
  dirCurrency: DirCurrency;
  expenseDti: number;
  freshMoney: number;
  gracePeriod: number;
  id: number;
  incomeDti: number;
  incomeNet: number;
  maxAnnPayment: number;
  maxCreditSum: number;
  maxCreditTerm: number;
  paymentInOtherBankRate: number;
  prepaymentRate: number;
  product: ProductRes;
  rate: number;
  ref10AcbLiability: AcbLiabilityDto;
  ref1AcbLiability: AcbLiabilityDto;
  ref2AcbLiability: AcbLiabilityDto;
  ref3AcbLiability: AcbLiabilityDto;
  ref4AcbLiability: AcbLiabilityDto;
  ref5AcbLiability: AcbLiabilityDto;
  ref6AcbLiability: AcbLiabilityDto;
  ref7AcbLiability: AcbLiabilityDto;
  ref8AcbLiability: AcbLiabilityDto;
  ref9AcbLiability: AcbLiabilityDto;
  refinanceLiabilities?: string;
  restructureFee: number;
  coefDti: number;
  dtiAfterScoring: number;
  rateParam?: number;
  overpayPrepaymentRate?: number;
  issueFee?: number;
  creditInfoId: number;
  income: number;
  refNumber?: string;
  isGraceInterest: boolean;
}

export class BRMS2MatrixDto extends BRMSMatrixDto {}
export class BRMS4MatrixDto extends BRMSMatrixDto {}
export class BRMSFinalMatrixDto extends BRMSMatrixDto {}

export enum BrmsMatrixConditionType {
  APPROVE = 'APPROVE',
  POSSIBLE = 'POSSIBLE'
}

export class BRMSMatrixConditionType {
  active: boolean;
  changedByUsername: string;
  created: string | Date;
  id: string;
  nameEn: string;
  nameGe: string;
  nameRu: string;
  updated: string | Date;
}

export class RefAcbLiability {
  ref1AcbLiability: AcbLiabilityDto;
  ref2AcbLiability: AcbLiabilityDto;
  ref3AcbLiability: AcbLiabilityDto;
  ref4AcbLiability: AcbLiabilityDto;
  ref5AcbLiability: AcbLiabilityDto;
  ref6AcbLiability: AcbLiabilityDto;
  ref7AcbLiability: AcbLiabilityDto;
  ref8AcbLiability: AcbLiabilityDto;
  ref9AcbLiability: AcbLiabilityDto;
  ref10AcbLiability: AcbLiabilityDto;

  constructor(matrix: BRMSFinalMatrixDto) {
    this.ref1AcbLiability = !!matrix && !!matrix.ref1AcbLiability ? matrix.ref1AcbLiability : null;
    this.ref2AcbLiability = !!matrix && !!matrix.ref2AcbLiability ? matrix.ref2AcbLiability : null;
    this.ref3AcbLiability = !!matrix && !!matrix.ref3AcbLiability ? matrix.ref3AcbLiability : null;
    this.ref4AcbLiability = !!matrix && !!matrix.ref4AcbLiability ? matrix.ref4AcbLiability : null;
    this.ref5AcbLiability = !!matrix && !!matrix.ref5AcbLiability ? matrix.ref5AcbLiability : null;
    this.ref6AcbLiability = !!matrix && !!matrix.ref6AcbLiability ? matrix.ref6AcbLiability : null;
    this.ref7AcbLiability = !!matrix && !!matrix.ref7AcbLiability ? matrix.ref7AcbLiability : null;
    this.ref8AcbLiability = !!matrix && !!matrix.ref8AcbLiability ? matrix.ref8AcbLiability : null;
    this.ref9AcbLiability = !!matrix && !!matrix.ref9AcbLiability ? matrix.ref9AcbLiability : null;
    this.ref10AcbLiability = !!matrix && !!matrix.ref10AcbLiability ? matrix.ref10AcbLiability : null;
  }
}

export class RefAcbLiabilityId {
  ref1AcbLiabilityId: number;
  ref2AcbLiabilityId: number;
  ref3AcbLiabilityId: number;
  ref4AcbLiabilityId: number;
  ref5AcbLiabilityId: number;
  ref6AcbLiabilityId: number;
  ref7AcbLiabilityId: number;
  ref8AcbLiabilityId: number;
  ref9AcbLiabilityId: number;
  ref10AcbLiabilityId: number;

  constructor(obj: BRMSFinalMatrixDto) {
    this.ref1AcbLiabilityId =
      !!obj && !!obj.ref1AcbLiability && !!obj.ref1AcbLiability.id ? obj.ref1AcbLiability.id : null;
    this.ref2AcbLiabilityId =
      !!obj && !!obj.ref2AcbLiability && !!obj.ref2AcbLiability.id ? obj.ref2AcbLiability.id : null;
    this.ref3AcbLiabilityId =
      !!obj && !!obj.ref3AcbLiability && !!obj.ref3AcbLiability.id ? obj.ref3AcbLiability.id : null;
    this.ref4AcbLiabilityId =
      !!obj && !!obj.ref4AcbLiability && !!obj.ref4AcbLiability.id ? obj.ref4AcbLiability.id : null;
    this.ref5AcbLiabilityId =
      !!obj && !!obj.ref5AcbLiability && !!obj.ref5AcbLiability.id ? obj.ref5AcbLiability.id : null;
    this.ref6AcbLiabilityId =
      !!obj && !!obj.ref6AcbLiability && !!obj.ref6AcbLiability.id ? obj.ref6AcbLiability.id : null;
    this.ref7AcbLiabilityId =
      !!obj && !!obj.ref7AcbLiability && !!obj.ref7AcbLiability.id ? obj.ref7AcbLiability.id : null;
    this.ref8AcbLiabilityId =
      !!obj && !!obj.ref8AcbLiability && !!obj.ref8AcbLiability.id ? obj.ref8AcbLiability.id : null;
    this.ref9AcbLiabilityId =
      !!obj && !!obj.ref9AcbLiability && !!obj.ref9AcbLiability.id ? obj.ref9AcbLiability.id : null;
    this.ref10AcbLiabilityId =
      !!obj && !!obj.ref10AcbLiability && !!obj.ref10AcbLiability.id ? obj.ref10AcbLiability.id : null;
  }
}
