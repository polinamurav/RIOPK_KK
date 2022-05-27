import { DirCountry, Dir } from '..';

export class ApplicantTaxCountryDtoGet {
  applicantId: number;
  applicationId: number;
  comment: string;
  dirCountry: DirCountry;
  dirInnAbsenceReason: Dir;
  id: number;
  inn: string;
}

export class ApplicantTaxCountryDtoPost {
  applicantId: number;
  applicationId: number;
  comment: string;
  dirCountryId: number;
  dirInnAbsenceReasonId: number;
  id?: number;
  inn: string;

  constructor(applicantTaxCountryData: ApplicantTaxCountryDtoGet) {
    this.applicantId = applicantTaxCountryData.applicantId;
    this.applicationId = applicantTaxCountryData.applicationId;
    this.comment = applicantTaxCountryData.comment;
    this.dirCountryId = applicantTaxCountryData.dirCountry.id;
    this.dirInnAbsenceReasonId = applicantTaxCountryData.dirInnAbsenceReason.id;
    this.id = applicantTaxCountryData.id;
    this.inn = applicantTaxCountryData.inn;
  }
}
