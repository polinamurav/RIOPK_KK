import { Dir } from '@app/_models';
import { getId } from '@app/services/util/getId';

export class ApplicantContactPerson {
  applicantId: number;
  applicationId: number;
  dirFamilyRelationship: Dir;
  firstName: string;
  id: number;
  lastName: string;
  mobilePhone: string;
}

export class ApplicantContactPersonDto {
  applicantId: number;
  applicationId: number;
  dirFamilyRelationshipId: number;
  firstName: string;
  id: number;
  lastName: string;
  mobilePhone: string;

  constructor(applicantContactPerson: ApplicantContactPerson) {
    this.applicantId = applicantContactPerson.id;
    this.applicationId = applicantContactPerson.applicationId;
    this.dirFamilyRelationshipId = getId(applicantContactPerson.dirFamilyRelationship);
    this.firstName = applicantContactPerson.firstName;
    this.id = applicantContactPerson.id;
    this.lastName = applicantContactPerson.lastName;
    this.mobilePhone = applicantContactPerson.mobilePhone;
  }
}
