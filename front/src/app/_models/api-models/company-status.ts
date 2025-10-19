import { BaseDir } from './directory';

export class CompanyStatus extends BaseDir {
  active: boolean;
  changedByUsername: string;
  created: string | Date;
  id: string;
  nameAm: string;
  nameRu: string;
  updated: string | Date;
}
