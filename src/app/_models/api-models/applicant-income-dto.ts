import { Company, Dir, DirAbsCode, DirCurrency, DirStage, Directory } from '..';

import { getId } from '@app/services/util/getId';

export class ApplicantIncomeGetDto {
  amount: number;
  amountGEL: number;
  applicantId: number;
  applicationId: number;
  company: Company;
  companyCategory: string;
  dirCurrency: DirCurrency;
  dirCompanyActivityType: Directory;
  dirIncomeFrequency: Dir;
  dirIncomeType: DirAbsCode;
  dirJobPosition: Dir;
  id: number;
  isBasic: boolean;
  isIncomeUsed: boolean;
  isSalaryProject: boolean;
  jobExp: number;
  jobPosition: string;
  monthCnt: number;
  stageId: string;
}
export class ApplicantIncomePostDto {
  amount: number;
  amountGEL: number;
  applicantId: number;
  applicationId: number;
  companyCategory: string;
  companyId: string;
  dirCompanyActivityTypeId: number;
  dirCurrencyId: string;
  dirIncomeFrequencyId: number;
  dirIncomeTypeId: number;
  dirJobPositionId: number;
  id: number;
  isBasic: boolean;
  isIncomeUsed: boolean;
  isSalaryProject: boolean;
  jobExp: number;
  jobPosition: string;
  monthCnt: number;
  stageId: string;

  constructor(obj: ApplicantIncomeGetDto) {
    this.amount = obj.amount;
    this.amountGEL = obj.amountGEL;
    this.applicantId = obj.applicantId;
    this.applicationId = obj.applicationId;
    this.companyCategory = obj.companyCategory;
    this.companyId = getId<string>(obj.company) || null;
    this.dirCurrencyId = getId<string>(obj.dirCurrency) || null;
    this.dirCompanyActivityTypeId = getId(obj.dirCompanyActivityType);
    this.dirIncomeFrequencyId = getId(obj.dirIncomeFrequency);
    this.dirIncomeTypeId = getId(obj.dirIncomeType);
    this.dirJobPositionId = getId(obj.dirJobPosition);
    this.id = obj.id;
    this.isBasic = obj.isBasic;
    this.isIncomeUsed = obj.isIncomeUsed;
    this.isSalaryProject = obj.isSalaryProject;
    this.jobExp = obj.jobExp;
    this.jobPosition = obj.jobPosition;
    this.monthCnt = obj.monthCnt;
    this.stageId = obj.stageId;
  }
}
