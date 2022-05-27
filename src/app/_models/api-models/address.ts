import { Dir, DirAbsCode, DirCityDto, DirCountry } from '..';

export class Address {
  applicantId: number;
  asanCity: string;
  asanCountry: string;
  asanIndex: string;
  asanRegion: string;
  asanStreet: string;
  city: DirCityDto;
  cityParsed: DirCityDto;
  country: DirCountry;
  countryParsed: DirCountry;
  created: string;
  dirCommunicationType: Dir;
  employmentId: number;
  id: number;
  index: string;
  indexParsed: string;
  naxcivanRespublika: boolean;
  region: DirAbsCode;
  regionParsed: DirAbsCode;
  street: string;
  streetParsed: string;
  updated: string;
}

export class EmptyAddress {
  applicantId: number = null;
  asanCity: string = null;
  asanCountry: string = null;
  asanIndex: string = null;
  asanRegion: string = null;
  asanStreet: string = null;
  city: DirCityDto = null;
  cityParsed: DirCityDto = null;
  country: DirCountry = null;
  countryParsed: DirCountry = null;
  created: string | Date = new Date();
  dirCommunicationType: Dir = null;
  employmentId: number = null;
  id: number = null;
  index: string = null;
  indexParsed: string = null;
  naxcivanRespublika: boolean = null;
  region: DirAbsCode = null;
  regionParsed: DirAbsCode = null;
  street: string = null;
  streetParsed: string = null;
  updated: string | Date = new Date();

  constructor(applicantId: number) {
    this.applicantId = applicantId;
  }
}
