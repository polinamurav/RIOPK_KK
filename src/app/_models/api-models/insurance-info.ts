import { DirAbsCode } from '@app/_models';

export class InsuranceInfo {
  absInsuranceCompanyCode: number;
  companyName: string;
  created: string;
  id: number;
  insuranceBrokerage: number;
  insuranceType: DirAbsCode;
  productName: string;
  propertyCode: string;
  propertyName: string;
  updated: string;
}

export class InsuranceInfoDto {
  absInsuranceCompanyCode: number;
  companyName: string;
  id: number;
  insuranceBrokerage: number;
  insuranceTypeId: number;
  productName: string;
  propertyCode: string;
  propertyName: string;

  constructor(insuranceData: Partial<InsuranceInfo>) {
    this.absInsuranceCompanyCode = insuranceData.absInsuranceCompanyCode;
    this.companyName = insuranceData.companyName;
    this.id = insuranceData.id || null;
    this.insuranceBrokerage = insuranceData.insuranceBrokerage;
    this.insuranceTypeId = insuranceData.insuranceType ? insuranceData.insuranceType.id : null;
    this.productName = insuranceData.productName;
    this.propertyCode = insuranceData.propertyCode;
    this.propertyName = insuranceData.propertyName;
  }
}
