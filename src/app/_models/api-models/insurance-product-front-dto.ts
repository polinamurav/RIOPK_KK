import { DirAbsCode } from '@app/_models';

export class InsuranceProductFrontDto {
  companyAbsCode: number;
  companyName: string;
  dirInsuranceType: DirAbsCode;
  insuranceProductAbsCode: number;
  insuranceProductName: string;
  productAbsCode: string;
  propertyCode: string;
  propertyName: string;
  rateFrom: number;
  rateTo: number;
  typeAbsCode: number;
}
