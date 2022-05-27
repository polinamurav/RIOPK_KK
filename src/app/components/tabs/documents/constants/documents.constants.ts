import { TableDataHeader } from '@app/_models';

export const DOCUMENTS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('attachmentType.nameRu', 'Documents.TableHeaders.DocumentType', 'ru', 'attachmentType.nameRu'),
  new TableDataHeader('attachmentType.nameGe', 'Documents.TableHeaders.DocumentType', 'ge', 'attachmentType.nameGe'),
  new TableDataHeader('attachmentType.nameEn', 'Documents.TableHeaders.DocumentType', 'en', 'attachmentType.nameEn'),
  new TableDataHeader('filename', 'Documents.TableHeaders.File', 'link', 'filename'),
  new TableDataHeader('created', 'Documents.TableHeaders.DateUpload', 'dateAndTime', 'created'),
  new TableDataHeader('changedByUsername', 'Documents.TableHeaders.WhoUpload', 'string', 'changedByUsername'),
  new TableDataHeader('isDeletePossible', 'Documents.TableHeaders.Delete', 'deletedDoc')
];
