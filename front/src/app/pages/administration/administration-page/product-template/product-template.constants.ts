import { EInputType, TableDataHeader, ValueType } from '@app/_models';

export const PRODUCT_TEMPLATE_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Номер шаблона', 'string', 'code'),
  new TableDataHeader('minRate', 'Мин. ставка % годовых', 'string', 'minRate'),
  new TableDataHeader('maxRate', 'Макс. ставка % годовых', 'string', 'maxRate'),
  new TableDataHeader('minTerm', 'Мин. срок мес', 'string', 'minTerm'),
  new TableDataHeader('maxTerm', 'Макс. срок мес', 'string', 'maxTerm'),
  new TableDataHeader('minSum', 'Мин. сумма', 'string', 'minSum'),
  new TableDataHeader('maxSum', 'Макс. сумма', 'string', 'maxSum'),
  new TableDataHeader('isInsurance', 'Признак страховки', 'status', 'isInsurance'),
  new TableDataHeader('isSalary', 'Признак зарплатника', 'status', 'isSalary'),
  new TableDataHeader('active', 'Активно', 'status', 'active'),
  new TableDataHeader('changedBy', 'Кем изменено', 'string', 'changedBy')
];
