export class AttachmentDto {
  applicantId: number;
  applicationId: number;
  attachmentType: AttachmentType;
  changedByUsername: string;
  created: string;
  ecmUrl: string;
  filename: string;
  filetype: string;
  id: number;
  isDeletePossible: boolean;
  numberOfPages: number;
  timestampOfFile: string | Date;
}

export class AttachmentSaveData {
  file: File;
  name: string;
  typeId: string;
  changedByUsername?: string;
  applicationId?: number | string;
  imgAsString?: string;
}

export class AttachmentTableData {
  name: string;
  type: string;
  id: number | string;
}

export class AttachmentType {
  active: boolean;
  id: string;
  nameGe: string;
  nameEn: string;
  nameRu: string;
}
