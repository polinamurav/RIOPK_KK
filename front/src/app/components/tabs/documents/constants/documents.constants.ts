import { TableDataHeader } from '@app/_models';

export const DOCUMENTS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('attachmentType.nameRu', 'Documents.TableHeaders.DocumentType', 'ru', 'attachmentType.nameRu'),
  new TableDataHeader('attachmentType.nameAm', 'Documents.TableHeaders.DocumentType', 'am', 'attachmentType.nameAm'),
  new TableDataHeader('attachmentType.nameEn', 'Documents.TableHeaders.DocumentType', 'en', 'attachmentType.nameEn'),
  new TableDataHeader('filename', 'Documents.TableHeaders.File', 'link', 'filename'),
  new TableDataHeader('fileSizeConcerted', 'Documents.TableHeaders.FileSize', 'string', 'fileSizeConcerted'), // Размер файла
  new TableDataHeader('created', 'Documents.TableHeaders.DateUpload', 'dateAndTime', 'created'),
  new TableDataHeader('changedByUsername', 'Documents.TableHeaders.WhoUpload', 'string', 'changedByUsername'),
  new TableDataHeader('isDeletePossible', 'Documents.TableHeaders.Delete', 'deletedDoc')
];
