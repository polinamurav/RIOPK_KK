import { Address, DirCountry, Directory, IdentityCard, PageDTO, PaginationAndSortingDto } from '..';

import { ClientStatus } from './client-status';
import { getId } from '@app/services/util/getId';

export class ClientPagedInfoDto {
  created: Date | string;
  creditManager: string;
  fio: string;
  id: number;
  status: string;
}

export class Client {
  asanIdResponseId: number;
  birthDate: Date | string;
  birthPlace: string;
  citizenship: DirCountry;
  clientStatus: ClientStatus;
  created: Date | string;
  dirCompanyActivityType: Directory;
  firstName: string;
  gender: Directory;
  id: number;
  identityCard: IdentityCard;
  lastName: string;
  managerId: number;
  maritalStatus: Directory;
  middleName: string;
  mobilePhone: string;
  photo: string;
  regAddr: Address;
  regAddress: string;
  updated: Date | string;
}

export class ClientDto {
  asanIdResponseId: number;
  birthDate: Date | string;
  birthPlace: string;
  citizenshipId: number;
  clientStatusId: string;
  created: Date | string;
  dirCompanyActivityTypeId: number;
  firstName: string;
  genderId: number;
  id: number;
  identityCardId: number;
  lastName: string;
  managerId: number;
  maritalStatusId: number;
  middleName: string;
  mobilePhone: string;
  photo: string;
  regAddress: string;
  regAddr: Address;
  updated: Date | string;

  constructor(obj: Client) {
    this.asanIdResponseId = obj.asanIdResponseId;
    this.birthDate = obj.birthDate;
    this.birthPlace = obj.birthPlace;
    this.citizenshipId = getId(obj.citizenship);
    this.clientStatusId = getId<string>(obj.clientStatus) || null;
    this.created = obj.created;
    this.dirCompanyActivityTypeId = getId(obj.dirCompanyActivityType);
    this.firstName = obj.firstName;
    this.genderId = getId(obj.gender);
    this.id = obj.id;
    this.identityCardId = getId(obj.identityCard);
    this.lastName = obj.lastName;
    this.managerId = obj.managerId;
    this.maritalStatusId = getId(obj.maritalStatus);
    this.middleName = obj.middleName;
    this.mobilePhone = obj.mobilePhone;
    this.photo = obj.photo;
    this.regAddress = obj.regAddress;
    this.regAddr = obj.regAddr;
    this.updated = new Date();
  }
}

export class ClientsState {
  completed: PageDTO<ClientPagedInfoDto>;
  inProgress: PageDTO<ClientPagedInfoDto>;
  error: PageDTO<ClientPagedInfoDto>;
  all: PageDTO<ClientPagedInfoDto>;
}

export class ClientsFilter {
  clientsSearch: string;
}
