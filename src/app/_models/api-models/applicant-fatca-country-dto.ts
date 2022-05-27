import { ApplicantFatcaDtoGet, DirCountry } from '..';

export class ApplicantFatcaCountryDtoGet {
  applicantFatcaDtoGet: ApplicantFatcaDtoGet;
  dirCountry: DirCountry;
  id: number;
}

export class ApplicantFatcaCountryDtoPost {
  applicantFatcaId: number;
  dirCountryId: number;
  id?: number;

  constructor(fatcaCountryData: ApplicantFatcaCountryDtoGet) {
    this.applicantFatcaId = fatcaCountryData.applicantFatcaDtoGet ? fatcaCountryData.applicantFatcaDtoGet.id : null;
    this.dirCountryId = fatcaCountryData.dirCountry ? fatcaCountryData.dirCountry.id : null;
    this.id = fatcaCountryData.id;
  }
}
