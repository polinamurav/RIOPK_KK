export class InternalLoanListResponseDto {
  applicantId: number;
  applicationId: number;
  guid: string;
  id: number;
  internalLoans: InternalLoanDto[];
  request: string;
  response: string;
  rqDate: string | Date;
  rsDate: string | Date;
  statusCode: string;
  statusMessage: string;
  statusName: string;
}

export class InternalLoanDto {
  absId: number;
  accountIdentifier: number;
  accountIdentifierEx: number;
  agreementNo: string;
  amount: number;
  borrowerId: number;
  branchId: number;
  calcDate: string | Date;
  ccy: string;
  debtNextdueDate: string | Date;
  debtOverdueDate: string | Date;
  debtOverdueDays: number;
  debtOverdueTotal: number;
  debtPrevdueDate: string | Date;
  departmentId: number;
  eomPayments: boolean;
  guaranteeType: string;
  id: number;
  interestBasis: number;
  interestFreeDays: number;
  interestRate: number;
  internalLoanAttributes: InternalLoanAttributeDto[];
  internalLoanCoborrowers: InternalLoanCoborrowerDto[];
  internalLoanDebts: InternalLoanDebtDto[];
  isCard: boolean;
  isGracePeriod: boolean;
  isRestructuring: boolean;
  nextPaymentDate: string | Date;
  paymentDay: number;
  paymentIntervalFromUsage: boolean;
  paymentIntervalType: string;
  paymentIntervalValue: number;
  penaltySchemaId: number;
  pmtAmountRegular: number;
  principalTotal: number;
  productId: number;
  productName: string;
  provisioningRate: number;
  purposeId: string;
  status: string;
  termEnd: string | Date;
  termStart: string | Date;
  totalNumberOfDelinquencyDays: number;
  usageType: string;
  version: string;
}

export class InternalLoanAttributeDto {
  attrKey: string;
  attrValue: string;
  id: number;
}

export class InternalLoanCoborrowerDto {
  coborrowerId: number;
  id: number;
}

export class InternalLoanDebtDto {
  amount: number;
  id: number;
  name: string;
}
