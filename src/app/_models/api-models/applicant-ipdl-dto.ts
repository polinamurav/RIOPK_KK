import { Dir, StaticDirectory } from '..';

class ApplicantIpdlGetBase {
  applicantId: number;
  applicationId: number;
  dirIpdl: Dir;
  id: number;
  result: boolean;
}

export class ApplicantIpdlGetDto extends ApplicantIpdlGetBase {
  result: boolean;
}

export class ApplicantIpdlOperationGetDto extends ApplicantIpdlGetBase {
  fio: string;
}

export class ApplicantIpdlRelativeGetDto extends ApplicantIpdlOperationGetDto {
  dirFamilyRelationship: StaticDirectory;
}

class ApplicantIpdlPostBase {
  applicantId: number;
  applicationId: number;
  dirIpdlId: number;
  id?: number;
}

export class ApplicantIpdlPostDto extends ApplicantIpdlPostBase {
  result: boolean;

  constructor(ipdlData: ApplicantIpdlGetDto) {
    super();
    this.applicantId = ipdlData.applicantId;
    this.applicationId = ipdlData.applicationId;
    this.dirIpdlId = ipdlData.dirIpdl.id;
    this.id = ipdlData.id;
    this.result = ipdlData.result;
  }
}

export class ApplicantIpdlOperationPostDto extends ApplicantIpdlPostBase {
  fio: string;

  constructor(ipdlData: ApplicantIpdlOperationGetDto) {
    super();
    this.applicantId = ipdlData.applicantId;
    this.applicationId = ipdlData.applicationId;
    this.dirIpdlId = ipdlData.dirIpdl.id;
    this.id = ipdlData.id;
    this.fio = ipdlData.fio;
  }
}

export class ApplicantIpdlRelativePostDto extends ApplicantIpdlPostBase {
  fio: string;
  dirFamilyRelationshipId: number;

  constructor(ipdlData: ApplicantIpdlRelativeGetDto) {
    super();
    this.applicantId = ipdlData.applicantId;
    this.applicationId = ipdlData.applicationId;
    this.dirIpdlId = ipdlData.dirIpdl.id;
    this.id = ipdlData.id;
    this.fio = ipdlData.fio;
    this.dirFamilyRelationshipId = +ipdlData.dirFamilyRelationship.id;
  }
}
