export class AttachmentDto {
  applicantId: number;
  applicationId: number;
  attachmentType: AttachmentType;
  changedByUsername: string;
  created: string;
  ecmUrl: string;
  attachmentId: string;
  filename: string;
  filetype: string;
  fileSize: number;
  id: number;
  isDeletePossible: boolean;
  isDeactivated: boolean;
  numberOfPages: number;
  fileSizeConcerted?: string;
  timestampOfFile: string | Date;
}

export interface AttachmentResponse {
  success: boolean;
  errorMessageAm: string;
  errorMessageRu: string;
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
  nameAm: string;
  nameEn: string;
  nameRu: string;
}
