import { Dir } from '@app/_models';

export interface CommunicationGetDto {
  address: CommunicationAddressDto;
  communication: string;
}

export interface CommunicationAddressDto {
  factAddress: string; //
  regAddress: string; //
  isRealEqFactAddress?: boolean;
}

export interface Communication {
  applicationId: number;
  dirCommunicationMethod: DirCommunicationMethod;
  dirCommunicationMethodOwner: DirCommunicationMethodOwner;
  id: number;
  value: string;
  addressType: string;
}

export class DirCommunicationMethod extends Dir {
  dirCommunicationMethodType: DirCommunicationMethodType;
}

export class DirCommunicationMethodOwner extends Dir {}

export class DirCommunicationMethodType extends Dir {}

export interface CommunicationPostDto {
  communications: CommunicationDto[];
}

export interface CommunicationDto {
  applicationId?: number;
  dirCommunicationMethodId?: number;
  dirCommunicationMethodOwnerId?: string;
  id?: number;
  value?: string;
  addressType?: string;

  isValidForm?: boolean;
}

export enum CommunicationType {
  BANK = 'BANK',
  STATEMENT = 'STATEMENT'
}

export enum CommunicationOwnerType {
  APPLICATION = 'APPLICATION',
  ACCOUNT = 'ACCOUNT'
}
