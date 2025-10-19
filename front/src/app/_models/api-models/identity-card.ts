import { DirCountry, DirAbsCode } from '..';

export class IdentityCard {
  created: string;
  dirCountry: DirCountry;
  pin: string;
  id: number;
  identityCardType: DirAbsCode;
  issueDate: string;
  issuedBy: string;
  number: string;
  series: string;
  signature: string;
  updated: string;
  validityDate: string;
}

export class EmptyIdentityCard implements IdentityCard {
  created: string = null;
  dirCountry: DirCountry = null;
  pin: string = null;
  id: number = null;
  identityCardType: DirAbsCode = null;
  issueDate: string = null;
  issuedBy: string = null;
  number: string = null;
  series: string = null;
  signature: string = null;
  updated: string = null;
  validityDate: string = null;
}
