export class NotificationSetting {
  created: string | Date;
  id: number;
  key: string;
  nameAm?: string;
  nameEn?: string;
  nameRu?: string;
  valueAm?: string;
  valueEn?: string;
  valueRu?: string;
  extErrorMsg?: string;
  updated: string | Date;
  changedByUsername: string;
}

export interface INotifParameters {
  key?: string;
  nameAm?: string;
  nameRu?: string;
  nameEn?: string;
  valueAm?: string;
  valueEn?: string;
  valueRu?: string;
  extErrorMsg?: string;
}
