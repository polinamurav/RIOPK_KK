import { applicationTypesEnum } from '@app/pages/dashboard/dashboard-page/tabs/credit-app/constants/short-form-config';

export interface CreditUserInfoDto {
  agreement: boolean; // Согласие подписано

  agreementFile: FileUploadDto;

  applicationType: applicationTypesEnum;
  branchCode: string;
  channel: string;
  creditAmount: number; // Сумма кредита
  currencyId: string; // Валюта
  dsaUtmUsername: string;
  email: string; // email
  esignAgreement: boolean;
  firstName: string; // Имя
  identityCardPin: string; // Номер документа, удостоверяющего личность
  identityCardTypeId: number; // Тип документа, удостоверяющего личность
  initUsername: string;
  isClientMilitary: boolean; // Признак того, является ли клиент силовиком
  isClientVip: boolean; // Признак того, является ли клиент VIP клиентом
  language: string; // Язык
  lastName: string; // Фамилия
  onlineExtClientId: string;
  phone: string; // Номер телефона
  preApprovedOfferId: number; // id предодобренного предложения
  productId: string; // Идентификатор продукта
  shortApplicationId: number; // id краткой заявки
  socCardPin?: string; // Номер соц. карты
  socCardTypeId: number; // Тип соц. карты
  userDSA: string;
  isSms: boolean;
}

export interface FileUploadDto {
  file?: File;

  content?: string; //  Содержимое файла в BASE64

  extension?: string; //   Расширение файла

  name?: string; //   Наименование файла

  size?: number; //   Размер файла

  type?: string; //   Тип документа = AGREEMENT
}

export interface CheckCodeRq {
  code?: string; //
  phone?: string; //
  shortApplicationId?: number; //
}

export interface SendOtpRq {
  email?: string; //
  phone?: string; //
  lang?: string; //
  isSms?: boolean; //
  shortApplicationId?: number; //
}

export interface SendOtpRs {
  errorMessageAm: string; //
  errorMessageRu: string; //
  shortApplicationId: number; //
  success: boolean; //
}

export interface ShortEkengRqDto {
  identityCardPin: string; //
  identityCardTypeId: number; //
  phone: string; //
  shortApplicationId: number; //
}

export interface LivenessCheckResponseDto {
  errorMessageAm: string; //  Сообщение об ошибке АРМ
  errorMessageRu: string; //  Сообщение об ошибке РУС
  errorLiveliness: boolean; //     Результат проверки
  errorBiometrics: boolean; //     Результат проверки
  result: boolean; //  Результат проверки
}
