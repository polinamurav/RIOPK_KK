import { Dir } from '..';

export class ApplicantIncomeTypeGetDto {
  amount: number;
  applicantId: number;
  applicationId: number;
  description: string;
  dirIncomeType: Dir;
  id: number;
}

export class ApplicantIncomeTypePostDto {
  amount: number;
  applicantId: number;
  applicationId: number;
  description: string;
  dirIncomeTypeId: number;
  id?: number;

  constructor(incomeTypeData: ApplicantIncomeTypeGetDto) {
    this.amount = incomeTypeData.amount || 0;
    this.applicantId = incomeTypeData.applicantId;
    this.applicationId = incomeTypeData.applicationId;
    this.description = incomeTypeData.description;
    this.dirIncomeTypeId = incomeTypeData.dirIncomeType.id;
    this.id = incomeTypeData.id;
  }
}
