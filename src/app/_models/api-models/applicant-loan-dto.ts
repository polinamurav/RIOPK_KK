import { DirAbsCode, DirStage } from './directory';

import { DirCurrency } from '../directory-models';
import { getId } from '@app/services/util/getId';

export class ApplicantLoanGetDto {
  applicantId: number;
  applicationId: number;
  bankName: string;
  beginDate: string | Date;
  borrowerFirstName: string;
  borrowerLastName: string;
  contractCode: string;
  contractIdentifier: string;
  dirBank: DirAbsCode;
  dirCurrency: DirCurrency;
  endDate: string | Date;
  guarantorCnt: number;
  id: number;
  initialAmount: number;
  isBorrower: boolean;
  monthlyPayment: number;
  outstandingAmount: number;
  overdueAmount: number;
  rate: number;
  stageId: string;
}

export class ApplicantLoanPostDto {
  applicantId: number;
  applicationId: number;
  bankName: string;
  beginDate: string | Date;
  borrowerFirstName: string;
  borrowerLastName: string;
  contractCode: string;
  contractIdentifier: string;
  dirBankId: number;
  dirCurrencyId: string;
  endDate: string | Date;
  guarantorCnt: number;
  id: number;
  initialAmount: number;
  isBorrower: boolean;
  monthlyPayment: number;
  outstandingAmount: number;
  overdueAmount: number;
  rate: number;
  stageId: string;

  constructor(obj: ApplicantLoanGetDto) {
    this.applicantId = obj.applicantId;
    this.applicationId = obj.applicationId;
    this.bankName = obj.bankName;
    this.beginDate = new Date(obj.beginDate);
    this.borrowerFirstName = obj.borrowerFirstName;
    this.borrowerLastName = obj.borrowerLastName;
    this.contractCode = obj.contractCode;
    this.contractIdentifier = obj.contractIdentifier;
    this.dirBankId = getId(obj.dirBank);
    this.dirCurrencyId = getId(obj.dirCurrency);
    this.endDate = new Date(obj.endDate);
    this.guarantorCnt = obj.guarantorCnt;
    this.id = obj.id;
    this.initialAmount = obj.initialAmount;
    this.isBorrower = obj.isBorrower;
    this.monthlyPayment = obj.monthlyPayment;
    this.outstandingAmount = obj.outstandingAmount;
    this.overdueAmount = obj.overdueAmount;
    this.rate = obj.rate;
    this.stageId = obj.stageId;
  }
}
