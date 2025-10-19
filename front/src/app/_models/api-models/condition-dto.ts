import { getId } from '@app/services/util/getId';
import { Dir } from './directory';
import { ProductDto } from './product';

export class Condition {
  absPenaltySchema: number;
  active: boolean;
  adminFeeRate: number;
  changedByUsername: string;
  created: string | Date;
  currency: Dir;
  fee1Min: number;
  gracePeriod: number;
  id: number;
  interestRateFrom: number;
  interestRateTo: number;
  maxPeriod: number;
  maxSum: number;
  minPeriod: number;
  minSum: number;
  overpayPrepaymentRate: number;
  paymentInOtherBankRate: number;
  prepaymentRate: number;
  product: ProductDto;
  tariff: Dir;
  updated: string | Date;
  forCard?: boolean;
  forEmployee?: boolean;
  forRef?: boolean;
  forSalary?: boolean;
}

export class ConditionDto {
  absPenaltySchema: number;
  active: boolean;
  adminFeeRate: number;
  changedByUsername: string;
  created: string | Date;
  currency: Dir;
  fee1Min: number;
  gracePeriod: number;
  id: number;
  interestRateFrom: number;
  interestRateTo: number;
  maxPeriod: number;
  maxSum: number;
  minPeriod: number;
  minSum: number;
  overpayPrepaymentRate: number;
  paymentInOtherBankRate: number;
  prepaymentRate: number;
  productId: number;
  tariff: Dir;
  updated: string | Date;

  constructor(condition: Condition) {
    this.absPenaltySchema = condition.absPenaltySchema;
    this.active = condition.active;
    this.adminFeeRate = condition.adminFeeRate;
    this.changedByUsername = condition.changedByUsername;
    this.created = condition.created;
    this.currency = condition.currency;
    this.fee1Min = condition.fee1Min;
    this.gracePeriod = condition.gracePeriod;
    this.id = condition.id;
    this.interestRateFrom = condition.interestRateFrom;
    this.interestRateTo = condition.interestRateTo;
    this.maxPeriod = condition.maxPeriod;
    this.maxSum = condition.maxSum;
    this.minPeriod = condition.minPeriod;
    this.minSum = condition.minSum;
    this.overpayPrepaymentRate = condition.overpayPrepaymentRate;
    this.paymentInOtherBankRate = condition.paymentInOtherBankRate;
    this.prepaymentRate = condition.prepaymentRate;
    this.productId = getId(condition.product);
    this.tariff = condition.tariff;
    this.updated = condition.updated;
  }
}

export class EmptyConditionDto {
  absPenaltySchema: number = null;
  active: boolean = null;
  adminFeeRate: number = null;
  changedByUsername: string = null;
  created: string | Date = null;
  currency: Dir = null;
  fee1Min: number = null;
  gracePeriod: number = null;
  id: number = null;
  interestRateFrom: number = null;
  interestRateTo: number = null;
  maxPeriod: number = null;
  maxSum: number = null;
  minPeriod: number = null;
  minSum: number = null;
  overpayPrepaymentRate: number = null;
  paymentInOtherBankRate: number = null;
  prepaymentRate: number = null;
  productId: number = null;
  tariff: Dir = null;
  updated: string | Date = null;
}
