export class InsuranceCompany {
  active: boolean;
  changedByUsername: string;
  code: string;
  created: string | Date;
  id?: number;
  name: string;
  updated: string | Date;
}

export class InsuranceCompanyDto extends InsuranceCompany {}
