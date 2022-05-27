import { ApplicationPagedInfoDto, PageDTO } from '..';

export interface PreapprovedUpload {
  changedByUsername: string;
  created: string;
  details: string;
  fileContent: string;
  fileName: string;
  fileType: string;
  id: number;
  isUploadSuccess: boolean;
}

export class PreapprovedUploadState {
  preapprovedUpload: PageDTO<ApplicationPagedInfoDto>;
}
