import { BaseDir } from './directory';

export class CompanyStatus extends BaseDir {
  active: boolean;
  changedByUsername: string;
  created: string | Date;
  id: string;
  nameGe: string;
  nameRu: string;
  updated: string | Date;
}
