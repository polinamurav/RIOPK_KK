import { DirAbsCode } from '@app/_models';

// Получение агрегатов ВКИ

export class VkiAggregates {
  closeDate: string; // Ближайшая дата очередного платежа
  maxWorstClass: DirAbsCode;
  maxWorstClass13_24: DirAbsCode;
  maxWorstClass1_12: DirAbsCode;
  maxWorstClassClose: DirAbsCode;
  maxWorstClassClose1_24: DirAbsCode;
  maxWorstClassGuarantee: DirAbsCode;
  maxWorstClassOpen: DirAbsCode;
  responseTimestamp: string; // Дата и время запроса
  sumBalance: string; // Ежемесячный взнос по кредитам
  sumDaysOfDelayedPayments: number; // Кол-во дней задержек платежей
  sumNumberOfCasesOfDelay: number; // Кол-во случаев просрочки
  sumNumberOfLoanClassReviews: number; // Кол-во пересмотров класса риска кредитов
  sumNumberOfOverdueDays13_24: number; // Кол-во просроченных дней 13-24 мес.
  sumNumberOfOverdueDays1_12: number; // Кол-во просроченных дней 1-12 мес.
}
