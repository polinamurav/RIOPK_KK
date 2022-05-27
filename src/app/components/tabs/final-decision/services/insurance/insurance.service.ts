import { Injectable } from '@angular/core';
import { InsuranceCondition } from '@app/_models';
import { IInsuranceCreditOptions } from '../../constants/insuranceForm';

@Injectable()
export class InsuranceService {
  // id = 1 Финансовая защита
  // id = 2 Страхование от несчастных случаев Company

  calculateBrokerage(
    creditInfo: IInsuranceCreditOptions,
    conditions: InsuranceCondition[],
    insuranceTypeId: number,
    insuranceCompanyId: number
  ): number {
    return insuranceTypeId === 1
      ? this.calculateFinProtectionBrokerage(creditInfo, conditions)
      : this.calculateCompanyBrokerage(creditInfo, conditions, insuranceCompanyId);
  }

  calculateFinProtectionBrokerage(creditInfo: IInsuranceCreditOptions, conditions: InsuranceCondition[]): number {
    let brokerage: number;
    conditions
      .filter((condition: InsuranceCondition) => condition.product !== null)
      .forEach((condition: InsuranceCondition) => {
        const conditionIdsEqual = condition.product.id === creditInfo.product.id;
        const conditionTerm = creditInfo.creditTerm >= condition.minTerm && creditInfo.creditTerm <= condition.maxTerm;

        if (conditionIdsEqual && conditionTerm) {
          brokerage = this.calcBrokerage(creditInfo.creditAmount, condition);
        }
      });

    return brokerage || 0;
  }

  calculateCompanyBrokerage(
    creditInfo: IInsuranceCreditOptions,
    conditions: InsuranceCondition[],
    insuranceCompanyId: number
  ): number {
    let brokerage: number;
    conditions
      .filter((condition: InsuranceCondition) => condition.insuranceCompany !== null)
      .forEach((condition: InsuranceCondition) => {
        const conditionIdsEqual = condition.insuranceCompany.id === insuranceCompanyId;
        const conditionTerm = creditInfo.creditTerm >= condition.minTerm && creditInfo.creditTerm <= condition.maxTerm;

        if (conditionIdsEqual && conditionTerm) {
          brokerage = this.calcBrokerage(creditInfo.creditAmount, condition);
        }
      });

    return brokerage || null;
  }

  calcBrokerage(creditAmount: number, condition: InsuranceCondition): number {
    const interestAmount = (creditAmount * condition.rate) / 100;
    const minAmount = condition.minAmount;

    return Math.max(interestAmount, minAmount);
  }
}
