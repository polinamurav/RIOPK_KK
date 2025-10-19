import { TableDataHeader } from '@app/_models';

export const PREAPPROVE_BASE_IN_WORK: TableDataHeader[] = [
  new TableDataHeader('created', 'Дата', 'dateAndTime', 'created'),
  new TableDataHeader('details', 'Название базы', 'string', 'details'),
  new TableDataHeader('statusId', 'Статус', 'statusPreapprove', 'statusId')
];

export const PREAPPROVE_BASE_ACTIVATED: TableDataHeader[] = [
  new TableDataHeader('created', 'Дата', 'dateAndTime', 'created'),
  new TableDataHeader('details', 'Название базы', 'string', 'name'),
  new TableDataHeader('activateDate', 'Начало', 'date', 'activateDate'),
  new TableDataHeader('endDate', 'Окончание', 'date', 'endDate'),
  new TableDataHeader('deactivated', 'Buttons.Disable', 'button', '')
];
