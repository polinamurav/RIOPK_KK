import { BaseDir } from './directory';
import { DirInsuranceType } from './insurance-condition';
import { InsuranceCompany } from './insurance-company';
import { ProductDto } from './product';

export class AbsCommission extends BaseDir {
  id: string;
}

export class AbsCommissionConfig {
  absCommission: AbsCommission;
  active: boolean;
  changedByUsername: string;
  commissionExists: number;
  created: string | Date;
  id: number;
  insuranceCompany: InsuranceCompany;
  insuranceType: DirInsuranceType;
  product: ProductDto;
  updated: string | Date;
}

export class AbsCommissionConfigDto extends AbsCommissionConfig {}

export class EmptyAbsCommissionConfigDto {
  absCommission: AbsCommission = null;
  active: boolean = null;
  changedByUsername: string = null;
  commissionExists: number = null;
  created: string | Date = null;
  id: number = null;
  insuranceCompany: InsuranceCompany = null;
  insuranceType: DirInsuranceType = null;
  product: ProductDto = null;
  updated: string | Date = null;
}
