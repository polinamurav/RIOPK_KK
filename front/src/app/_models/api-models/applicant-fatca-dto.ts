import { DirFatca } from '..';

export class ApplicantFatcaDtoGet {
  applicantId: number;
  applicationId: number;
  dirFatca: DirFatca;
  id: number;
  result: boolean;
}

export class ApplicantFatcaDtoPost {
  applicantId: number;
  applicationId: number;
  dirFatcaId: number;
  id: number;
  result: boolean;

  constructor(fatcaData: ApplicantFatcaDtoGet) {
    this.applicantId = fatcaData.applicantId;
    this.applicationId = fatcaData.applicationId;
    this.dirFatcaId = fatcaData.dirFatca.id;
    this.id = fatcaData.id;
    this.result = fatcaData.result;
  }
}
