import { Address, DirAbsCode, Dir } from '..';

export class Employment {
  addCompanyInn: string;
  addCompanyName: string;
  addCompanyPhone: string;
  address: string;
  addressObj: Address;
  companyName: string;
  created: string;
  currentEmploymentAgreementDate: string;
  currentExperience: number;
  dirCompanyActivityType: DirAbsCode;
  dirEmploymentLegalStructureType: DirAbsCode;
  dirNumberEmployee: Dir;
  employmentCount: number;
  hasAddEmployment: boolean;
  id: number;
  income: number;
  inn: string;
  jobPosition: string;
  labourContactPosition: string;
  otherIncome: number;
  phone: string;
  totalExperience: number;
  updated: string;

  dirCompanyActivityId?: number;
  dirNumberEmployeeId?: number;
  dirEmploymentLegalStructureTypeId?: number;
}

export class EmploymentFrontDto {
  addCompanyInn: string;
  addCompanyName: string;
  addCompanyPhone: string;
  address: string;
  addressObj: Address;
  companyName: string;
  currentEmploymentAgreementDate: string;
  currentExperience: number;
  dirCompanyActivityId: number;
  dirEmploymentLegalStructureTypeId: number;
  dirNumberEmployeeId: number;
  employmentCount: number;
  hasAddEmployment: boolean;
  id: number;
  income: number;
  inn: string;
  jobPosition: string;
  labourContactPosition: string;
  otherIncome: number;
  phone: string;
  totalExperience: number;

  constructor(obj: Employment) {
    this.addCompanyInn = obj.addCompanyInn;
    this.addCompanyName = obj.addCompanyName;
    this.addCompanyPhone = obj.addCompanyPhone;
    this.address = obj.address;
    this.addressObj = obj.addressObj;
    this.companyName = obj.companyName;
    this.currentEmploymentAgreementDate = obj.currentEmploymentAgreementDate;
    this.currentExperience = obj.currentExperience;
    this.dirCompanyActivityId = obj.dirCompanyActivityType ? obj.dirCompanyActivityType.id : null;
    this.dirEmploymentLegalStructureTypeId = obj.dirEmploymentLegalStructureType
      ? obj.dirEmploymentLegalStructureType.id
      : null;
    this.dirNumberEmployeeId = obj.dirNumberEmployee ? obj.dirNumberEmployee.id : null;
    this.employmentCount = obj.employmentCount;
    this.hasAddEmployment = obj.hasAddEmployment;
    this.id = obj.id;
    this.income = obj.income;
    this.inn = obj.inn;
    this.jobPosition = obj.jobPosition;
    this.labourContactPosition = obj.labourContactPosition;
    this.otherIncome = obj.otherIncome;
    this.phone = obj.phone;
    this.totalExperience = obj.totalExperience;
  }
}
