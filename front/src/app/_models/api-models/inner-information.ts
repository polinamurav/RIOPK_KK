import { CreditInfoLoanBase } from './integration-interface';
import { ChatbotStatus, Dir, DirCurrency, IdentityCardType, Product } from '@app/_models';
import { string } from '@amcharts/amcharts4/core';
import { AbsAndRkkDto, StatusReports } from '@app/_models/api-models/opz-applications-facade-dto';

export class SummaryIndividualsDataDto {
  applicantId: number;
  applicationId: number;
  associatedPersonsList: AssociatedPersonsDto[];
  closestPaymentDate: Date; // Ближайшая дата очередного взноса
  creditInfoLoanList: CreditInfoLoanDto[]; // Обязательства физ. лица
  daysOfDelayedPayments: number; // Кол-во дней задержек платежей
  guid: string;
  id: number;
  individualCode: string; // Код физ.лица
  individualName: string; // Имя физ.лица
  monthlyLoanInstallment: number; // Ежемесячный взнос по кредитам
  numberOfCasesOfDelay: number; // Кол-во случаев просрочки
  numberOfLoanRiskClassReviews: number; // Кол-во пересмотров класса риска кредитов
  numberOfOverdueDays13to24month: number; // Кол-во просроченных дней 13-24 мес.
  numberOfOverdueDays1to12month: number; // Кол-во просроченных дней 1-12 мес.
  numberOfReceivedLoans1to12month: number; // Кол-во полученных кредитов 1-12 мес.
  parallelApplicationsList: IntegrationAbsParallelApplicationsDto[]; // Параллельные заявки
  requestDateTime: Date; // Дата и время запроса
  rqDate: Date;
  rsDate: Date;
  worstRiskClass: string; // Наихудший класс риска
  worstRiskClass13to24month: string; // Наихудший класс риска (13-24 мес)
  worstRiskClass1to12month: string; // Наихудший класс риска (1-12 мес)
  worstRiskClassActiveLoans: string; // Наихудший класс риска (действующие кредиты)
  worstRiskClassOnSureties: string; // Наихудший класс риска по поручительствам
  worstRiskClassPaidOffLoans: string; // Наихудший класс риска (погашенные кредиты)
  worstRiskClassPaidOffLoans1to24month: string; // Наихудший класс риска (погашенные кредиты 1-24 мес)
}

export class ParallelApplicationsDto {
  applicationAmount: number; // Сумма заявки
  applicationCode: string; // Код заявки
  applicationStatus: string; // Статус заявки
  fullNameOfApplicant: string; // ФИО заявителя
  id: number;
  loanType: number; // Вид кредита
  summaryIndividualsDataDto: SummaryIndividualsDataDto; // Обобщенные данные по отдельным лицам
}

export class AssociatedPersonsDto {
  balanceOfLoansInBank: number; // Остаток кредитов в Банке
  clientCodeABS: string; // Код клиента в АБС
  communicationType: string; // Тип связи
  fullNameOfRelatedPerson: string; // ФИО взаимосвязанного лица
  id: number;
  summaryIndividualsDataDto: SummaryIndividualsDataDto; // Обобщенные данные по отдельным лицам
}

export class CreditInfoLoanDto extends CreditInfoLoanBase {
  summaryIndividualsDataDto: SummaryIndividualsDataDto; // Обобщенные данные по отдельным лицам
}

export interface IntegrationAbsParallelApplicationsDto {
  applicationAmount: number; //  Сумма заявки

  applicationDate: string; //   Дата  заявки

  applicationId: string; //   Код заявки

  applicationStatusFromABS: DirAbsApplicationStatus;
  applicationStatusName: string; //   Статус заявки
  applicationStatusfromRKK: Status;

  applicationStatusForView: Dir;
  applicationTypeLoanView: Dir;

  approvedAmount: number; //  Утверждённая сумма

  branchCode: string; //   Код филиала

  commentForOPZ: string; //   Комментарии для ОПЗ

  commentForRM: string; //   Комментарии для РМ

  creditType: DirAbsProductType; //   Подтип кредита

  declineReasonOPZ: string; //   Причина отказа ОПЗ

  dirCurrency: DirCurrency;
  fullNameOfApplicant: string; // ФИО заявителя

  id: number; //
  identityCardNumber: string; // Номер документа

  loanTypeFromABS: DirAbsProductType;
  loanTypeFromRKK: Product;

  identityCardType: IdentityCardType;
  loanType: number; // Вид кредита

  matchingKey: string; // Ключ совпадения

  opzDate: string; // Дата ОПЗ

  opzEmployee: string; // Сотрудник ОПЗ

  participantRole: AbsAndRkkDto; // Роль участника

  prerequisites: string; // Предпосылки

  requestedAmount: number; // Запрошенная сумма

  socCardNumber: string; // Номер соц.карты
}

export class DirAbsProductType {
  active: boolean; // запись активна

  changedByUsername: string; // кем изменено

  code: string; // код

  created: string; // дата создания записи

  id: number; // идентификатор

  nameAm: string; // наименование на армянском

  nameEn: string; // наименование на английском

  nameRu: string; // наименование на русском

  symbolCode: string; // код символа

  updated: string; // дата обновления записи
}

export class DirAbsApplicationStatus {
  absCode: string;

  active: boolean;

  changedByUsername: string; // кем изменено

  created: string; // дата создания записи

  id: number; // идентификатор

  nameAm: string; // наименование на армянском

  nameEn: string; // наименование на английском

  nameRu: string; // наименование на русском

  updated: string; // дата обновления записи
}

export class Status {
  chatbotStatus: ChatbotStatus;
  id: string;
  nameAm: string;
  nameEn: string;
  nameRu: string;
  statusReports: StatusReports;
}
