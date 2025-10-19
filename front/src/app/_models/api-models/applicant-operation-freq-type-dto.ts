import { Dir } from '..';

export class ApplicantOperationFreqTypeGetDto {
  applicantId: number;
  applicationId: number;
  dirOperationFreqType: Dir;
  id: number;
  result: boolean;
}

export class ApplicantOperationFreqTypePostDto {
  applicantId: number;
  applicationId: number;
  dirOperationFreqTypeId: number;
  id: number;
  result: boolean;

  constructor(operationFreqTypeData: ApplicantOperationFreqTypeGetDto) {
    this.applicantId = operationFreqTypeData.applicantId;
    this.applicationId = operationFreqTypeData.applicationId;
    this.dirOperationFreqTypeId = operationFreqTypeData.dirOperationFreqType.id;
    this.id = operationFreqTypeData.id;
    this.result = operationFreqTypeData.result;
  }
}
