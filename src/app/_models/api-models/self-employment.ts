import { Dir, Directory } from './directory';

import { getId } from '@app/services/util/getId';

export class SelfEmployment {
  applicantId: number;
  applicationId: number;
  companyActivityType: Directory;
  created: string;
  dirInnStatus: Dir;
  dirInnType: Dir;
  id: number;
  inn: string;
  legalAddress: string;
  repFirstName: string;
  repLastName: string;
  repMiddleName: string;
  updated: string;
}

export class SelfEmploymentDto {
  applicantId: number;
  applicationId: number;
  companyActivityTypeId: number;
  created: string | Date;
  dirInnStatusId: number;
  dirInnTypeId: number;
  id: number;
  inn: string;
  legalAddress: string;
  repFirstName: string;
  repLastName: string;
  repMiddleName: string;
  updated: string | Date;

  constructor(obj: SelfEmployment) {
    this.applicantId = obj.applicantId;
    this.applicationId = obj.applicationId;
    this.companyActivityTypeId = getId<number>(obj.companyActivityType);
    this.created = obj.created;
    this.dirInnStatusId = getId<number>(obj.dirInnStatus);
    this.dirInnTypeId = getId<number>(obj.dirInnType);
    this.id = obj.id;
    this.inn = obj.inn;
    this.legalAddress = obj.legalAddress;
    this.repFirstName = obj.repFirstName;
    this.repLastName = obj.repLastName;
    this.repMiddleName = obj.repMiddleName;
    this.updated = obj.updated;
  }
}
