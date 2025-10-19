// * 9. Предварительно одобренные условия кредитования анкета
import { TableDataHeader } from '@app/_models';

export const APP_DUPLICATES_TABLE: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'ApplicationAside.AppNumber', 'string', 'applicationId'),
  new TableDataHeader('branchNameRu', 'ShortForm.Branch', 'ru', 'branchNameRu'),
  new TableDataHeader('branchNameAm', 'ShortForm.Branch', 'am', 'branchNameAm'),
  new TableDataHeader('createdBy', 'ApplicationAside.Designer', 'string', 'createdBy'),
  new TableDataHeader('createdDate', 'InsideInfo.TableHeaders.ApplicationDateCreation', 'date', 'createdDate'),
  new TableDataHeader('stageNameRu', 'Этап заявки', 'ru'),
  new TableDataHeader('stageNameAm', 'Этап заявки', 'am'),
  new TableDataHeader('choose', 'Продолжить оформление', 'string')
];
