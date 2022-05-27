export class NotificationSetting {
  created: string | Date;
  id: number;
  key: string;
  nameGe?: string;
  nameEn?: string;
  nameRu?: string;
  valueGe?: string;
  valueEn?: string;
  valueRu?: string;
  extErrorMsg?: string;
  updated: string | Date;
  changedByUsername: string;
}

export interface INotifParameters {
  key?: string;
  nameGe?: string;
  nameRu?: string;
  nameEn?: string;
  valueGe?: string;
  valueEn?: string;
  valueRu?: string;
  extErrorMsg?: string;
}
