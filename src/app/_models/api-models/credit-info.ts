import { Dir, DirAbsCode, Directory } from './directory';
import { ProductRes } from './product';
import { BRMSMatrixConditionType } from '@app/_models/api-models/brms';
import { DirCurrency } from '@app/_models/api-models/dir-currency';
import { getId } from '@app/services/util/getId';

export class CreditInfo {
  altRate: number;
  applicationId: number;
  brmsMatrixConditionType: BRMSMatrixConditionType;
  confirmedAmount: number;
  created: string | Date;
  creditAmount: number;
  creditRefPayment: number;
  creditTerm: number;
  dirCreditPurpose: DirAbsCode;
  dirCurrency: DirCurrency;
  dirEnsureType: DirAbsCode;
  dirIssueType: DirAbsCode;
  dirProvisionRate: Dir;
  dirScheduleFrequency: Dir;
  dirScheduleType: DirAbsCode;
  dtiOutcoming: number;
  expenseDti: number;
  firstTrancheAmount: number;
  freshMoney: number;
  monthlyPayment: number;
  id: number;
  incomeNet: number;
  isGraceInterest: boolean;
  isInsurance: boolean;
  issueFee: number;
  restructureFee: number;
  overpayPrepaymentRate: number;
  prepaymentRate: number;
  paymentInOtherBankRate: number;
  gracePeriod: number;
  isIndivTerms: boolean;
  paymentDay: number;
  product: ProductRes;
  provisionRate: number;
  rate: number;
  refinanceLiabilities: string;
  secondPaymentDay: number;
  trancheAmount: number;
  updated: string | Date;
  coefDti: number;
  dtiAfterScoring: number;
}

export class CreditInfoDto {
  altRate: number;
  applicationId: number;
  confirmedAmount: number;
  creditAmount: number;
  creditRefPayment: number;
  creditTerm: number;
  dirCreditPurposeId: number;
  dirCurrencyId: string;
  dirEnsureTypeId: number;
  dirIssueTypeId: number;
  dirProvisionRateId: number;
  dirScheduleFrequencyId: number;
  dirScheduleTypeId: number;
  dtiOutcoming: number;
  expenseDti: number;
  firstTrancheAmount: number;
  freshMoney: number;
  gracePeriod: number;
  id: number;
  incomeNet: number;
  isGraceInterest: boolean;
  isIndivTerms: boolean;
  isInsurance: boolean;
  issueFee: number;
  monthlyPayment: number;
  overpayPrepaymentRate: number;
  paymentDay: number;
  paymentInOtherBankRate: number;
  prepaymentRate: number;
  productId: number;
  rate: number;
  refinanceLiabilities: string;
  restructureFee: number;
  secondPaymentDay: number;
  trancheAmount: number;
  coefDti: number;
  dtiAfterScoring: number;

  constructor(obj: CreditInfo) {
    this.altRate = obj.altRate;
    this.applicationId = obj.applicationId;
    this.confirmedAmount = obj.confirmedAmount;
    this.creditAmount = obj.creditAmount;
    this.creditRefPayment = obj.creditRefPayment;
    this.creditTerm = obj.creditTerm;
    this.dirCreditPurposeId = getId(obj.dirCreditPurpose);
    this.dirCurrencyId = getId(obj.dirCurrency);
    this.dirEnsureTypeId = getId(obj.dirEnsureType);
    this.dirIssueTypeId = getId(obj.dirIssueType);
    this.dirProvisionRateId = getId(obj.dirProvisionRate);
    this.dirScheduleFrequencyId = getId(obj.dirScheduleFrequency);
    this.dirScheduleTypeId = getId(obj.dirScheduleType);
    this.dtiOutcoming = obj.dtiOutcoming;
    this.expenseDti = obj.expenseDti;
    this.firstTrancheAmount = obj.firstTrancheAmount;
    this.freshMoney = obj.freshMoney;
    this.gracePeriod = obj.gracePeriod;
    this.id = obj.id;
    this.incomeNet = obj.incomeNet;
    this.isGraceInterest = obj.isGraceInterest;
    this.isIndivTerms = obj.isIndivTerms;
    this.isInsurance = obj.isInsurance;
    this.issueFee = obj.issueFee;
    this.monthlyPayment = obj.monthlyPayment;
    this.overpayPrepaymentRate = obj.overpayPrepaymentRate;
    this.paymentDay = obj.paymentDay;
    this.paymentInOtherBankRate = obj.paymentInOtherBankRate;
    this.prepaymentRate = obj.prepaymentRate;
    this.productId = getId(obj.product);
    this.rate = obj.rate;
    this.refinanceLiabilities = obj.refinanceLiabilities;
    this.restructureFee = obj.restructureFee;
    this.secondPaymentDay = obj.secondPaymentDay;
    this.trancheAmount = obj.trancheAmount;
    this.coefDti = obj.coefDti;
    this.dtiAfterScoring = obj.dtiAfterScoring;
  }
}

export class CreditInfoByPinDto {
  applicationId: number;
  created: string;
  creditAmount: number;
  creditTerm: number;
  dirCreditPurpose: Directory;
  dirCurrency: Directory;
  id: number;
  product: ProductRes;
  freshMoney: number;
  monthlyPaymen: number;
  updated: string;
  rate: number;
}

export class CreditInfoUpdateDto {
  dirEnsureTypeId: number;
  dirIssueTypeId: number;
  dirScheduleFrequencyId: number;
  dirScheduleTypeId: number;
  id: number;
  isGraceInterest: boolean;
  paymentDay: number;
  secondPaymentDay: number;
}
