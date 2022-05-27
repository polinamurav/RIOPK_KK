import {RoleDto} from './role';
import {Directory} from './directory';
import {DirPartner} from '@app/_models/api-models/dir-partner';

export class User {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  active: boolean;
  authorities: RoleDto[];
  bossUsername: string;
  changedByUsername: string;
  code: string;
  created: string | Date;
  credentialsNonExpired: boolean;
  deactivated: string | Date;
  deactivatedByUsername: string;
  dirBranch: Directory;
  dirDepartment: Directory;
  dirPartner: DirPartner;
  enabled: boolean;
  fio: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  patronymic: string;
  updated: string | Date;
  username: string;
  usernameAbs: string;
}

export class UserDto {
  active: boolean;
  authorities: RoleDto[];
  bossUsername: string;
  changedByUsername: string;
  code: string;
  created: string | Date;
  deactivated: string | Date;
  deactivatedByUsername: string;
  dirBranch: Directory;
  dirDepartment: Directory;
  dirPartner: DirPartner;
  email: string;
  fio: string;
  firstName: string;
  id: number;
  lastName: string;
  patronymic: string;
  updated: string | Date;
  username: string;
  usernameAbs: string;
}

export class AuthState extends UserDto {
  isLoading: boolean;
  isAuthenticated: boolean;
  isInvalid?: boolean;
}
