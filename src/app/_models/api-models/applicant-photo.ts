export class ApplicantPhoto {
  applicantId: number;
  applicationId: number;
  changedByUsername: string;
  created: string | Date;
  id: number;
  photo: string;
  photoBranch: string;
  updated: string | Date;
}

export class ApplicantPhotoDto extends ApplicantPhoto {}
