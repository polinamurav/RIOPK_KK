import { AcraCreditInfoLoan } from './integration-acra';

export class NorqEkengAbsResponses {
  absProvenIncomeInfoList: AbsProvenIncomeInfo[];
  argWorkDataList: NorqArgWorkDataDto[];
  ekengTaxResponse: EkengTaxResponse;
}

export class AbsProvenIncomeInfo {
  countOfIncomeAmount: number; // Кол-во поступлений
  employerName: string; // Перечисляющее лицо
  period: Date; // Месяц поступления
  sumOfIncomeAmount: number; // Сумма поступлений
}

export class AbsCardTurnover {
  count: number; //   Количество поступлений
  doctype: number; //   Тип документа
  formatteddate: string; //   Месяц поступления
  profile: number; //   Profile карты
  sum: number; //   Сумма поступлений
  corpCard: number;
  corpNamea: string;
  corpTaxPayer: string; // ИНН организации на карте
  currency: string;
  fullCormName?: string;
}

export class NorqArgWorkDataDto {
  address: string; // ? Адрес места работы
  avum: number; // ? Средства оплаты труда
  entryDate: Date; // Начало рабочего договора
  expiryDate: Date; // Конец рабочего договора
  gorcatuKod: string; // ? Код работодателя
  hvhh: string; // ? Налоговый код
  id: number;
  pajmanData: Date; // ? Дата приема на работу
  pashton: string; // Должность
  registorKod: string; // ? Код регистра
  salary: number; // Среднемесячная средства оплаты труда
  socvjar: number; // ? Cоц оплата
  workName: string; // Наименование место работы
  workPhone: string; // ? Номер рабочего телефона
}

export class EkengTaxResponse {
  applicantId: number;
  applicationId: number;
  ekengTaxPayerInfos: EkengTaxPayerInfo[]; // ? информация о плательщиках
  guid: string;
  id: number;
  request: string;
  response: string;
  rqDate: Date;
  rsDate: Date;
  statusCode: string;
  statusMessage: string;
  statusName: string;
}

export class EkengTaxPayerInfo {
  acraLoanList: AcraCreditInfoLoan[];
  civilLowContractPayments: number; // Оплата труда по гражданскому договору
  date: Date;
  id: number;
  incomeTax: number; // Подоходный налог
  salaryEquivPayments: number; // Зарплата и эквивалентные выплаты
  socialPayments: number; // Социальные выплаты
  socialPaymentsPaid: number; // Сумма совершенных социальных выплат
  taxPayerId: string; // ? Идентификатор налогоплательщика
  workingHours: number; // Количество рабочих часов данного лица
}
