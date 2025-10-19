import { ProductDto } from './product';

export interface PreApprovedOfferDto {
  changedByUsername?: string; // Логин пользователя, внесшего изменения
  created: string; // Дата создания предложения
  creditAmount: number; // Сумма кредита
  currencyId: string; // Валюта кредита
  expirationDate: string; // Срок базы (срок до которого действует предложение)
  id: number; // Уникальный идентификатор предложения
  identityCardTypeId: number; // Тип документа, удостоверяющего личность
  isActive: boolean; // Признак активности записи
  monthlyPayment?: number; // Ежемесячный платеж
  offerBase?: string; // Наименование базы
  pin: string; // Номер документа, удостоверяющего личность
  product: ProductDto;
  rate: number; // Ставка
  status: DirPreapprovedStatusDto;
  updated: string; // Дата изменения предложения
}

export interface DirPreapprovedStatusDto {
  active: boolean; // Признак активности записи
  changedByUsername?: string; // Логин пользователя, который внес изменения
  created: string; // Дата создания записи
  id: string; // Уникальный идентификатор статуса предодобренного предложения
  nameAm?: string; // Наименование статуса на арямнском
  nameRu?: string; // Наименование статуса на русском
  updated?: string; // Дата изменения записи
}

export interface PreapprovedOfferParams {
  identityCardTypeId?: number; // Тип документа, удостоверяющего личность
  identityCardPin?: string; // Номер документа, удостоверяющего личность
  shortApplicationId: number;
}
