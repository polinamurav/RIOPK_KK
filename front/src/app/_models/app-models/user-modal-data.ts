import { RoleDto, UserDto } from '..';
import { DirPartner } from '@app/_models/api-models/dir-partner';
import { DirTradingCompanyPointDto } from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IUserModalConfig {
  userRoles: RoleDto[];
  currentUserData: UserDto;
  showAdminModal?: boolean;
  showSendButton?: boolean;
  isActiveUser?: boolean;
  title?: string;
  clientData?: UserDto;
  partners?: DirPartner[];
  points$?: BehaviorSubject<DirTradingCompanyPointDto[]>;
  activateDeactivateUser?(username: string, status: string, callback: (isActive: boolean) => boolean): void;
}
