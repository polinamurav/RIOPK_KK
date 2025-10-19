import { Injectable } from '@angular/core';
import { Application, StageType } from '@app/_models';
import { BRMSMatrixDto } from '@app/_models/api-models/brms';
import { ToastService } from '@app/services/toast.service';

@Injectable()
export class ValidateMatrixDataService {
  constructor(private toastService: ToastService) {}

  validateSumAndTermByProdcat(
    application: Application,
    originMatrix: BRMSMatrixDto,
    transformMatrix: BRMSMatrixDto,
    isTopUp?: boolean
  ): boolean {
    const selectedTopUp =
      !!transformMatrix.topUps && !!transformMatrix.topUps.length
        ? transformMatrix.topUps.find(el => el.isSelected)
        : null;

    const originMaxLimit = isTopUp
      ? !!selectedTopUp
        ? selectedTopUp.maxLimit
        : originMatrix.maxLimit
      : originMatrix.maxLimit;

    const sumConditionTopUp = transformMatrix.topUpRemainAmount < transformMatrix.topUpMinAmountCash;

    const sumCondition =
      transformMatrix.maxLimit > originMaxLimit ||
      transformMatrix.maxLimit < originMatrix.minCreditSum ||
      (isTopUp ? sumConditionTopUp : false);

    if (sumCondition) {
      this.sumNotify(originMatrix.minCreditSum, originMaxLimit, isTopUp, originMatrix.topUpMinAmountCash);
      return false;
    }

    return this.termCondition(application, originMatrix, transformMatrix, isTopUp);
  }

  private termCondition = (
    application: Application,
    originMatrix: BRMSMatrixDto,
    transformMatrix: BRMSMatrixDto,
    isTopUp?: boolean
  ): boolean => {
    const creditTerm = transformMatrix.creditTerm;
    let originCreditTerm = originMatrix.creditTerm;
    let originMinCreditTerm = originMatrix.minCreditTerm;
    let originMaxCreditTerm = originMatrix.maxCreditTerm;

    if (isTopUp) {
      const topUp = transformMatrix.topUps.find(el => el.isSelected);
      originCreditTerm = topUp.creditTerm;
      originMaxCreditTerm = topUp.maxCreditTerm;
      originMinCreditTerm = topUp.minCreditTerm;
    }

    // if (application.isPreApproved) {
    //
    //
    //   console.log('application.isPreApproved', application.isPreApproved)
    //
    //   const condition = creditTerm > originMaxCreditTerm
    //     || creditTerm < originMinCreditTerm;
    //
    //   if (condition) {
    //     this.termNotify(originMinCreditTerm, originMaxCreditTerm);
    //     return false;
    //   }
    // } else {
    //
    //   const condition = creditTerm > originCreditTerm
    //     || creditTerm < originMinCreditTerm;
    //
    //   if (condition) {
    //     this.termNotify(originMinCreditTerm, originMaxCreditTerm);
    //     return false;
    //   }
    //
    //
    // }

    const condition = creditTerm > originCreditTerm || creditTerm < originMinCreditTerm;

    if (condition) {
      this.termNotify(originMinCreditTerm, originCreditTerm);
      return false;
    }

    return true;
  };

  private sumNotify = (min: number, max: number, isTopUp?: boolean, minTopUp?: number): void => {
    this.toastService.viewMsg(
      `Сумма лимита не может быть меньше,
        чем (${min}) ${
        isTopUp
          ? `
        и сумма кредита не менее (${minTopUp})`
          : ''
      } и больше, чем (${max}).`,
      'error'
    );
  };

  private termNotify = (min: number, max: number): void => {
    this.toastService.viewMsg(
      `Срок кредита не может быть меньше,
               чем (${min}) и больше, чем (${max}).`,
      'error'
    );
  };
}
