import { TableDataHeader } from '@app/_models';

export const creditConditionsColNameProps: TableDataHeader[] = [
  new TableDataHeader('brmsMatrixConditionType.nameRu', 'ТИП РАСЧЕТА', 'string', 'brmsMatrixConditionType.nameRu'),
  new TableDataHeader('product.nameRu', 'ПРОДУКТ', 'string', 'product.nameRu'),
  new TableDataHeader('creditSum', 'СУММА КРЕДИТА', 'number', 'creditSum'),
  new TableDataHeader('dirCurrency.id', 'ВАЛЮТА', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'СТАВКА, %', 'number', 'rate'),
  new TableDataHeader('freshMoney', 'СУММА НА РУКИ', 'number', 'freshMoney'),
  new TableDataHeader('annPayment', 'ПЛАТЕЖ', 'number', 'annPayment'),
  new TableDataHeader('creditTerm', 'СРОК, МЕС', 'wholeNumber', 'creditTerm'),
  new TableDataHeader('refinanceLiabilities', 'РЕФ. КРЕДИТЫ', 'string', 'refinanceLiabilities')
];

export const preApprovedColNameProps: TableDataHeader[] = [
  new TableDataHeader('brmsMatrixConditionType.nameRu', 'ТИП РАСЧЕТА', 'string', 'brmsMatrixConditionType.nameRu'),
  new TableDataHeader('product.nameRu', 'ПРОДУКТ', 'string', 'product.nameRu'),
  new TableDataHeader('creditAmount', 'СУММА КРЕДИТА', 'number', 'creditAmount'),
  new TableDataHeader('dirCurrency.id', 'ВАЛЮТА', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'СТАВКА, %', 'number', 'rate'),
  new TableDataHeader('freshMoney', 'СУММА НА РУКИ', 'number', 'freshMoney'),
  new TableDataHeader('monthlyPayment', 'ПЛАТЕЖ', 'number', 'monthlyPayment'),
  new TableDataHeader('creditTerm', 'СРОК, МЕС', 'wholeNumber', 'creditTerm'),
  new TableDataHeader('refinanceLiabilities', 'РЕФ. КРЕДИТЫ', 'string', 'refinanceLiabilities')
];

export const approvedCreditColNameProps: TableDataHeader[] = [
  new TableDataHeader('brmsMatrixConditionType.nameRu', 'ТИП РАСЧЕТА', 'string', 'brmsMatrixConditionType.nameRu'),
  new TableDataHeader('product.nameRu', 'ПРОДУКТ', 'string', 'product.nameRu'),
  new TableDataHeader('creditSum', 'СУММА КРЕДИТА', 'number', 'creditSum'),
  new TableDataHeader('dirCurrency.id', 'ВАЛЮТА', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'СТАВКА, %', 'number', 'rate'),
  new TableDataHeader('annPayment', 'ПЛАТЕЖ', 'number', 'annPayment'),
  new TableDataHeader('creditTerm', 'СРОК, МЕС', 'wholeNumber', 'creditTerm'),
  new TableDataHeader('choose', 'ВЫБРАТЬ', 'button')
];

export const availRefinanceColumnTableProps: TableDataHeader[] = [
  new TableDataHeader('accountNo', 'КРЕДИТНЫЙ ДОГОВОР', 'string'),
  new TableDataHeader('grantedOn', 'ДАТА ДОГОВОРА', 'date'),
  new TableDataHeader('outstandingDebtMain', 'СУММА РЕФИНАНСИРОВАНИЯ/ ТЕКУЩАЯ ЗАДОЛЖЕННОСТЬ', 'number'),
  new TableDataHeader('currency', 'ВАЛЮТА', 'string'),
  new TableDataHeader('selected', 'ВЫБРАТЬ', 'toggle')
];

export const validCardsColNameProps: TableDataHeader[] = [
  new TableDataHeader('cardType', 'ТИП', 'string'),
  new TableDataHeader('currency', 'ВАЛЮТА', 'string'),
  new TableDataHeader('acctNum', 'НОМЕР СЧЕТА', 'string'),
  new TableDataHeader('cardNum', 'НОМЕР КАРТЫ', 'string'),
  new TableDataHeader('cardExp', 'СРОК ДЕЙСТВИЯ КАРТЫ', 'date'),
  new TableDataHeader('choose', 'ВЫБРАТЬ КАРТУ', 'button')
];

export const chosenValidCardColNameProps: TableDataHeader[] = [
  new TableDataHeader('cardType', 'ТИП', 'string'),
  new TableDataHeader('currency', 'ВАЛЮТА', 'string'),
  new TableDataHeader('acctNum', 'НОМЕР СЧЕТА', 'string'),
  new TableDataHeader('cardNum', 'НОМЕР КАРТЫ', 'string'),
  new TableDataHeader('cardExp', 'СРОК ДЕЙСТВИЯ КАРТЫ', 'date')
];

export const visualAssessmentColNameProps: TableDataHeader[] = [
  new TableDataHeader('dirVisualAssessment.nameRu', 'ФАКТОР', 'string'),
  new TableDataHeader('result', 'РЕЗУЛЬТАТ', 'toggle'),
  new TableDataHeader('comment', 'КОММЕНТАРИЙ ', 'text')
];
