import { CompanyStatus } from './company-status';

export class CompanyDto {
  changedByUsername: string;
  companyStatusId: string;
  createdDate: string | Date;
  id: string;
  inDate: string | Date;
  name: string;
  tariffs: Tariff[];
  updatedDate: string | Date;
}

export class Company {
  changedByUsername: string;
  companyStatus: CompanyStatus;
  createdDate: string | Date;
  id: string;
  inDate: string | Date;
  name: string;
  tariffs: Tariff[];
  updatedDate: string | Date;
}

export class Tariff {
  active: boolean;
  changedByUsername: string;
  created: string | Date;
  defaultTariff: boolean;
  id: string;
  nameEn: string;
  nameAm: string;
  nameRu: string;
  updated: string | Date;
}
