import { ProductDto, Directory, DirectoryVal } from '..';

export class SelectedCondition {
  active: boolean;
  annualInterestRate: number;
  createdBy: number;
  currency: string;
  period: number;
  sum: number;

  accountNumber: string;

  codeword: string;
  contractNumber: string;
  costCard: number;

  repaymentAmount: number;
  termCard: number;
  unencumberedBalance: number;
  urgencyCard: string;
}

export class SelectedConditionRes extends SelectedCondition {
  product: ProductDto;
  created: string;
  annuityPayment: number;
  id: number;
  updated: string;

  dirBranch: Directory;
  dirPaymentCard: DirectoryVal;
}

export class SelectedConditionReq extends SelectedCondition {
  applicantId: number;
  applicationId: number;
  productId: number;

  dirPaymentCardId: number;
  nameOnCard: string;
  dirBranchId: number;
}
