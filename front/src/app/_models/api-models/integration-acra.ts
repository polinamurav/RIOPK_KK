import { PageDTO } from '../page-dto';
import { CreditInfoLoanBase } from './integration-interface';
import { Dir } from '@app/_models';

export class AcraCreditInfoResponse {
  acraCreditInfoList: AcraCreditInfoOtherBanks[]; // Запросы иных банков
  acraLoanList: AcraCreditInfoLoan[]; // Обязательства физ.лица
  applicantId: number;
  applicationId: number;
  dateOfInformationUpdate: string | Date; // Дата обновления информации
  daysOfDelayedPayments: number; // Кол-во дней задержек платежей
  guid: string;
  id: number;
  montlyLoanInstallment: number; // Ежемесячный взнос по кредитам
  numberOfCasesOfDelay: number; // Кол-во случаев просрочки
  numberOfLoanRiskClassReviews: number; // Кол-во пересмотров класса риска кредитов
  numberOfOverdueDays13to24month: number; // Кол-во просроченных дней 13-24 мес.
  numberOfOverdueDays1to12month: number; // Кол-во просроченных дней 1-12 мес.
  numberOfReceivedLoans1to12month: number; // Кол-во полученных кредитов 1-12 мес.
  request: string; // Запрос в АКРУ
  requestsCount: number; // Кол-во запросов
  response: string; // Ответ от АКРЫ
  rqDate: string | Date;
  rsDate: string | Date;
  statusCode: string;
  statusMessage: string;
  statusName: string;
  worstRiskClass: string; // Наихудший класс риска
  worstRiskClass13to24month: string; // Наихудший класс риска 13-24 мес.
  worstRiskClass1to12month: string; // Наихудший класс риска 1-12 мес.
  worstRiskClassActiveLoans: string; // Наихудший класс риска (действующие кредиты)
  worstRiskClassOnSureties: number; // Наихудший класс риска по поручительствам
  worstRiskClassPaidOffLoans: string; // Наихудший класс риска (погашенные кредиты)
  worstRiskClassPaidOffLoans1to24month: string; // Наихудший класс риска (погашенные кредиты 1-24 мес)
}

export class IntegrationAbsPledge {
  amountOfDeposit: number;
  currencyOfDeposit: string;
  depositCodeAbs: Dir;
  depositCodeAcra: Dir;
  updated: string;
}

export class AcraCreditInfoOtherBanks {
  acraCreditInfoResponse: AcraCreditInfoResponse;
  bankName: string; // Название организации
  id: number;
  loanReceived: boolean; // Полученный кредит в результате запроса да/нет
  requestDate: string | Date; // Дата запроса
  requestObjective: string; // Цель запроса
  requestType: string; // Тип запроса
  scopeOfUse: string; // Сфера использования
}

export class AcraCreditInfoLoan extends CreditInfoLoanBase {
  acraCreditInfoResponse: AcraCreditInfoResponse;
  creditorOrganization: string; // Организация-кредитор
  pledgeList: IntegrationAbsPledge[]; // Залог c АБС или АКРЫ
}

/**
 *  @todo Фильтры для обязательств
 */
export interface AcraLoanFilterDto {
  applicationId?: number;
  creditorOrganization?: string;
  source?: string;
  isCreditLine?: boolean;
  isReviewed?: boolean;
  kpzz?: boolean;
  status?: number;
  typeOfLoan?: number;
}

export class AcraLoanFilteredDto {
  aggregates: AcraLoanAggregatesDto;
  credits: AcraCreditInfoLoan[];
  filters: any;
}

/**
 * @todo Данные для колонки ИТОГО
 */
export class AcraLoanAggregatesDto {
  amountOfDepositSum: number;
  amountSum: number;
  monthlyLoanPaymentSum: number;
  remainderSum: number;
}
