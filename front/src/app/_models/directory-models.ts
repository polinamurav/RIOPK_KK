import { UserModel } from '.';

export interface Direct {
  active: boolean;
  code: string;
  created: string;
  changedByUsername?: string;
  id: number;
  name: string;
  updated: string;
}

export interface DirDto {
  active: boolean;
  code: string;
  id: number;
  name: string;
  changedByUsername: string;
  value: string;
}

// TODO check classes below:
export interface DirCurrency extends Direct {
  userCreatedCurrency: UserModel;
}

export interface DirCompaniesIndustry extends Direct {
  userCreatedCompaniesIndustry: UserModel;
}

export interface DirJobPositionCategory extends Direct {
  userCreatedJobPositionCategory: UserModel;
}

export interface DirCustomerCategory extends Direct {
  userCreatedCustomerCategory: UserModel;
}

export interface DirEmploymentStatus extends Direct {
  userCreatedEmploymentStatus: UserModel;
}

export interface DirCreditPurpose extends Direct {
  userCreatedCreditPurpose: UserModel;
}
