import { AttachmentType } from '@app/_models/attachment-dto';
import { DirDto } from '@app/_models/directory-models';
import { MimeTypes } from '@app/components/constants/mime-types';

export interface ModalData {
  pathTitle: string;
  accept?: MimeTypes[];
  returnString?: boolean;
  selectData?: DirDto[] | AttachmentType[];
  viewSearchSelect?: boolean;
  placeholder?: string;
  selectPropertyName?: string;
  attachmentTypeId?: string;
}
