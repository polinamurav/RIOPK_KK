import { LocalNames } from '@app/_models';

export class MaritalStatus implements LocalNames {
  absCode: string;
  code: string;
  created: string | Date;
  id: number;
  nameAm: string;
  nameEn: string;
  nameRu: string;
  updated: string | Date;
}
