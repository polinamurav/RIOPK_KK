// tslint:disable: max-line-length

import { EditableTableHeader, TableDataHeader } from '@app/_models';

export const PHONE_NUMBERS_HEADERS: EditableTableHeader[] = [
  { code: 'role', value: 'РОЛЬ АБОНЕНТА', type: 'string', isRequired: true, size: 'small' },
  { code: 'name', value: 'ФИО / НАИМЕНОВАНИЕ', type: 'string', isRequired: true },
  { code: 'phone', value: 'НОМЕР ТЕЛЕФОНА', type: 'phoneNumber', isRequired: true },
  { code: 'callStatusId', value: 'СТАТУС ЗВОНКА', type: 'select', isRequired: true },
  { code: 'comment', value: 'КОМMЕНТАРИЙ', type: 'textarea', isRequired: false, maxLength: 500 }
];

export const VERIFICATION_PHONE_NUMBERS_PROPS: TableDataHeader[] = [
  new TableDataHeader('role', 'РОЛЬ АБОНЕНТА', 'string'),
  new TableDataHeader('name', 'ФИО / НАИМЕНОВАНИЕ', 'string'),
  new TableDataHeader('phone', 'НОМЕР ТЕЛЕФОНА', 'string'),
  new TableDataHeader('callStatusId', 'СТАТУС ЗВОНКА', 'select'),
  new TableDataHeader('comment', 'КОМMЕНТАРИЙ', 'textarea')
];

export const VERIFICATION_PHONE_NUMBERS_PROPS_VIEW: TableDataHeader[] = [
  new TableDataHeader('role', 'РОЛЬ АБОНЕНТА', 'string'),
  new TableDataHeader('name', 'ФИО / НАИМЕНОВАНИЕ', 'string'),
  new TableDataHeader('phone', 'НОМЕР ТЕЛЕФОНА', 'string'),
  new TableDataHeader('callStatusId', 'СТАТУС ЗВОНКА', 'select'),
  new TableDataHeader('comment', 'КОМMЕНТАРИЙ', 'string')
];

export const CHOSEN_CREDIT_PROPS: TableDataHeader[] = [
  new TableDataHeader('brmsMatrixConditionType.nameRu', 'ТИП РАСЧЕТА', 'string', 'brmsMatrixConditionType.nameRu'),
  new TableDataHeader('product.nameRu', 'ПРОДУКТ', 'string'),
  new TableDataHeader('creditAmount', 'СУММА КРЕДИТА', 'number'),
  new TableDataHeader('dirCurrency.id', 'ВАЛЮТА', 'string'),
  new TableDataHeader('rate', 'СТАВКА, %', 'string'),
  new TableDataHeader('freshMoney', 'СУММА НА РУКИ', 'string'),
  new TableDataHeader('monthlyPayment', 'ПЛАТЕЖ', 'string'),
  new TableDataHeader('creditTerm', 'СРОК, МЕС', 'string'),
  new TableDataHeader('refinanceLiabilities', 'РЕФ. КРЕДИТЫ', 'string', 'refinanceLiabilities')
];

export const VERIFIED_INCOME_PROPS: TableDataHeader[] = [
  new TableDataHeader('brmsMatrixConditionType.nameRu', 'ТИП РАСЧЕТА', 'string', 'brmsMatrixConditionType.nameRu'),
  new TableDataHeader('product.nameRu', 'ПРОДУКТ', 'string'),
  new TableDataHeader('creditSum', 'СУММА КРЕДИТА', 'number'),
  new TableDataHeader('dirCurrency.id', 'ВАЛЮТА', 'string'),
  new TableDataHeader('rate', 'СТАВКА, %', 'string'),
  new TableDataHeader('freshMoney', 'СУММА НА РУКИ', 'string'),
  new TableDataHeader('annPayment', 'ПЛАТЕЖ', 'string'),
  new TableDataHeader('creditTerm', 'СРОК, МЕС', 'string')
];

export const NEGATIVE_INFO_PROPS: TableDataHeader[] = [
  new TableDataHeader('brmsRule.id', 'КОД', 'string'),
  new TableDataHeader('brmsRule.nameRu', 'НЕГАТИВНАЯ ИНФОРМАЦИЯ', 'string'),
  new TableDataHeader('description', 'РАСШИФРОВКА', 'string')
];

export const VISUAL_ASSESSMENT_PROPS: TableDataHeader[] = [
  new TableDataHeader('dirVisualAssessment.nameRu', 'ФАКТОР', 'string'),
  new TableDataHeader('result', 'РЕЗУЛЬТАТ', 'toggle'),
  new TableDataHeader('comment', 'КОММЕНТАРИЙ ', 'text')
];
