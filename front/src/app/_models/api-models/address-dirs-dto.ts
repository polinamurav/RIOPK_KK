import { Dir } from '@app/_models';

export class AddressDirsRqDto {
  communityId: number = null; //  id города

  regionId: number = null; //  id области

  residenceId: number = null; //  id района
}

export interface AddressDirsRsDto {
  communities: Dir[];
  regions: Dir[];
  residences: Dir[];
}
