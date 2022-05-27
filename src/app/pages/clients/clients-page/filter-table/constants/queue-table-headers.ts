import { TableDataHeader } from '@app/_models';

export const all: TableDataHeader[] = [
  new TableDataHeader('fio', 'КЛИЕНТ', 'string', 'fio'),
  new TableDataHeader('created', 'ДАТА СОЗДАНИЯ', 'dateAndTime', 'created'),
  new TableDataHeader('status', 'ЭТАП', 'string', 'status'),
  new TableDataHeader('creditManager', 'МЕНЕДЖЕР', 'string', 'creditManager')
];

export const adminErrors: TableDataHeader[] = [
  ...all,
  new TableDataHeader('refresh', 'ПЕРЕЗАПУСК', 'staticIconButton')
];
