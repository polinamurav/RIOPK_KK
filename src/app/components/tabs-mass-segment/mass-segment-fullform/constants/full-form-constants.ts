import { TableDataHeader } from '@app/_models';

export const CREDIT_NAME_PROPS: TableDataHeader[] = [
  new TableDataHeader('creditType', 'Тип кредита', 'creditType'),
  new TableDataHeader('initialAmount', 'Сумма кредита', 'number'),
  new TableDataHeader('currency', 'Валюта', 'string'),
  new TableDataHeader('outstandingDebtMain', 'Остаток по кредиту', 'number'),
  new TableDataHeader('outstandingDebtInterest', 'Сумма процентов', 'number'),
  new TableDataHeader('monthlyPaymentAmount', 'Ежемес.платеж', 'number'),
  new TableDataHeader('grantedOn', 'Дата выдачи', 'date'),
  new TableDataHeader('contractDueOn', 'Дата погашения', 'date')
];

export const GUARANTEE_CREDIT_NAME_PROPS: TableDataHeader[] = [
  new TableDataHeader('guaCreditType', 'Тип кредита', 'creditType'),
  new TableDataHeader('guaInitialAmount', 'Сумма кредита', 'number'),
  new TableDataHeader('guaCurrency', 'Валюта', 'string'),
  new TableDataHeader('guaOutstandingDebt', 'Остаток по кредиту', 'number'),
  new TableDataHeader('guaInterestAmount', 'Сумма процентов', 'number'),
  new TableDataHeader('guaMonthlyPaymentAmount', 'Ежемес.платеж', 'number'),
  new TableDataHeader('guaGrantedOn', 'Дата выдачи', 'date'),
  new TableDataHeader('guaContractDueOn', 'Дата погашения', 'date')
];
