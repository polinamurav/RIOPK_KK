import { Dir } from '..';

export class ApplicantDirOperationTypeGetDto {
  applicantId: number;
  applicationId: number;
  description: string;
  dirOperationType: Dir;
  id: number;
  result: boolean;
}

export class ApplicantDirOperationTypePostDto {
  applicantId: number;
  applicationId: number;
  description: string;
  dirOperationTypeId: number;
  id: number;
  result: boolean;

  constructor(operationTypeData: ApplicantDirOperationTypeGetDto) {
    this.applicantId = operationTypeData.applicantId;
    this.applicationId = operationTypeData.applicationId;
    this.description = operationTypeData.description;
    this.dirOperationTypeId = operationTypeData.dirOperationType.id;
    this.id = operationTypeData.id;
    this.result = operationTypeData.result;
  }
}
