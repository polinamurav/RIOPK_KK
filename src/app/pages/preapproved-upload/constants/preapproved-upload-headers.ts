import { TableDataHeader } from '@app/_models';

export const PREAPPROVED_HEADERS: TableDataHeader[] = [
  new TableDataHeader('fileName', 'TableHeader.File', 'link', 'fileName'),
  new TableDataHeader('created', 'TableHeader.DateUpload', 'dateAndTime', 'created'),
  new TableDataHeader('changedByUsername', 'TableHeader.WhoUpload', 'string', 'changedByUsername'),
  new TableDataHeader('isUploadSuccess', 'TableHeader.UploadSuccessful', 'status', 'isUploadSuccess'),
  new TableDataHeader('details', 'TableHeader.Details', 'string', 'details')
];
