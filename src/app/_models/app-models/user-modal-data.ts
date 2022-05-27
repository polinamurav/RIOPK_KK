import { RoleDto, UserDto } from '..';
import { DirPartner } from '@app/_models/api-models/dir-partner';

export interface IUserModalConfig {
  userRoles: RoleDto[];
  currentUserData: UserDto;
  showAdminModal?: boolean;
  showSendButton?: boolean;
  isActiveUser?: boolean;
  title?: string;
  clientData?: UserDto;
  partners?: DirPartner[];
  activateDeactivateUser?(username: string, status: string, callback: (isActive: boolean) => boolean): void;
}
