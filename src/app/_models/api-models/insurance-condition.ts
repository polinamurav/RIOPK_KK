import { BaseDir } from './directory';
import { InsuranceCompany } from './insurance-company';
import { ProductRes } from './product';

export class InsuranceCondition {
  active: boolean;
  changedByUsername: string;
  created: string | Date;
  id: number;
  insuranceCompany: InsuranceCompany;
  insuranceType: DirInsuranceType;
  maxTerm: number;
  minAmount: number;
  minTerm: number;
  product: ProductRes;
  rate: number;
  updated: string | Date;
}

export class InsuranceConditionDto {
  active?: boolean;
  changedByUsername?: string;
  created?: string | Date;
  id?: number;
  insuranceCompanyId?: number;
  insuranceTypeId?: number;
  maxTerm?: number;
  minAmount?: number;
  minTerm?: number;
  productId?: number;
  rate?: number;
  updated?: string | Date;
}
export class DirInsuranceType extends BaseDir {
  id: number;
}
