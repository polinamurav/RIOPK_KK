import { DirCountry, IdentityCard } from '..';

export class BeneficiaryOwner {
  birthDate: string;
  birthPlace: string;
  contacts: string;
  created: string;
  createdBy: number;
  dirCountry: DirCountry;
  factAddress: string;
  firstName: string;
  id: number;
  identityCard: IdentityCard;
  isRealEqFactAddress: boolean;
  lastName: string;
  middleName: string;
  regAddress: string;
  updated: string;
  updatedBy: number;
  voen: string;
}

export class BeneficiaryOwnerDto {
  birthDate: string;
  birthPlace: string;
  contacts: string;
  dirCountryId: number;
  factAddress: string;
  firstName: string;
  id: number;
  identityCard: IdentityCard;
  isRealEqFactAddress: boolean;
  lastName: string;
  middleName: string;
  regAddress: string;
  voen: string;

  constructor(obj: BeneficiaryOwner) {
    this.birthDate = obj.birthDate;
    this.birthPlace = obj.birthPlace;
    this.contacts = obj.contacts;
    this.dirCountryId = obj.dirCountry ? obj.dirCountry.id : null;
    this.factAddress = obj.factAddress;
    this.firstName = obj.firstName;
    this.id = obj.id;
    this.identityCard = obj.identityCard;
    this.isRealEqFactAddress = obj.isRealEqFactAddress;
    this.lastName = obj.lastName;
    this.middleName = obj.middleName;
    this.regAddress = obj.regAddress;
    this.voen = obj.voen;
  }
}
