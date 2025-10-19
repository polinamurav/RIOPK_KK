export class AcbHistoryResponse {
  created: string;
  exclusion: string;
  acbGuarantee: Guarantee[];
  id: number;
  acbLiabilities: Liability[];
  acbInquiryItems: AcbInquiryItems[];
  range: string;
  score: number;
  updated: string;
}

export class AcbInquiryItems {
  inqBankId: string | number;
  inqBankName: string;
  inqDate: string | number | Date;
  inqOrgIDType: string;
  inqPurposeId: string;
  inqPurposeName: string;
}

export class Guarantee {
  created: string;
  guaAccountNo: number;
  guaBankId: number;
  guaBankName: string;
  guaContractDueOn: number;
  guaCreditPurpose: string;
  guaCreditStatus: string;
  guaCreditType: string;
  guaCurrency: string;
  guaGrantedOn: number;
  guaInitialAmount: number;
  guaInterestAmount: number;
  guaInterestRate: number;
  guaLastUpdatedDate: number;
  guaLineAmount: number;
  guaMonthlyPaymentAmount: number;
  guaOrgType: string;
  guaOutstandingDebt: number;
  id: number;
  mkrId: number;
  updated: string;
}

export class Liability {
  accountNo: string;
  bankId: string;
  bankName: string;
  brmsMonthlyPayment: number;
  collateralAnyInfo: string;
  collateralCode: string;
  collateralMarketValue: number;
  collateralRegistryAgency: string;
  collateralRegistryDate: string;
  collateralRegistryNo: string;
  contractDueOn: number;
  created: string;
  creditPurpose: string;
  creditStatus: string;
  creditStatusCloseDate: number;
  creditType: string;
  currency: string;
  daysInterestOverdue: number;
  daysMainSumOverdue: number;
  grantedOn: number;
  historyOverdues: HistoryOverdue[];
  id: number;
  identifier: string;
  initialAmount: number;
  lastPaymentDate: number;
  lastUpdatedDate: number;
  lineAmount: number;
  mkrId: string;
  monthlyPaymentAmount: number;
  orgIDType: string;
  outstandingDebtInterest: number;
  outstandingDebtMain: number;
  prolongations: number;
  updated: string;
  isRefAvailable?: boolean;
}

export class HistoryOverdue {
  created: string;
  id: number;
  overdueDays: number;
  reportingPeriod: string;
  updated: string;
}

export class AcbLiabilityDto {
  acbHistoryItems: HistoryOverdue[];
  accountNo: string;
  bankId: string;
  bankName: string;
  brmsMonthlyPayment: number;
  collateralAnyInfo: string;
  collateralCode: string;
  collateralMarketValue: number;
  collateralRegistryAgency: string;
  collateralRegistryDate: string;
  collateralRegistryNo: string;
  contractDueOn: number;
  created: string;
  creditPurpose: string;
  creditStatus: string;
  creditStatusCloseDate: number;
  creditType: string;
  currency: string;
  daysInterestOverdue: number;
  daysMainSumOverdue: number;
  grantedOn: number;
  id: number;
  identifier: string;
  initialAmount: number;
  isRefAvailable: boolean;
  lastPaymentDate: number;
  lastUpdatedDate: number;
  lineAmount: number;
  mkrId: string;
  monthlyPaymentAmount: number;
  orgIDType: string;
  outstandingDebtInterest: number;
  outstandingDebtMain: number;
  prolongations: number;
  selected: boolean;
  updated: string;
  refNumber?: string;
}
