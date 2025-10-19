import {RoleDto} from './role';
import {Dir, Directory} from './directory';
import {DirPartner} from '@app/_models/api-models/dir-partner';
import {DirCompetenceLevel} from '@app/_models/api-models/dir-competence-level';
import {
  CreditProgramDto,
  DirTradingCompanyPointDto
} from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';

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
  competenceLevels: DirCompetenceLevel[];
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
  competenceLevels: DirCompetenceLevel[];
  email: string;
  branchCode: string;
  fio: string;
  firstName: string;
  id: number;
  lastName: string;
  patronymic: string;
  updated: string | Date;
  username: string;
  usernameAbs: string;
  defaultLang: string;
  defaultTheme: string;
  points?: DirTradingCompanyPointDto[];
}

export class AuthState extends UserDto {
  isLoading: boolean;
  isAuthenticated: boolean;
  isInvalid?: boolean;
}

export interface UserPosDto {
  accessESign: boolean; //  Е-sign доступ

  authorities: RoleDto[];
  changedByUsername: string; //  Кем изменено

  active: boolean; //  Код
  passwordToChange: boolean; //  Код
  code: string; //  Код
  email: string; //  Код

  created: string; //  Дата создания

  firstName: string; // Имя

  id: number; // Идентификатор

  lastName: string; // Фамилия
  fio: string; // Фамилия

  patronymic: string; // отчество

  mobilePhone: string; // pattern: ^\+374\d{8}$ Номер телефона

  pin: string; // Номер документа (паспорт, ID карта)

  points: DirTradingCompanyPointDto[];
  updated: string; // Дата обновления

  username: string; // Юзернейм
}

export class UserPosForTable {
  constructor(public item: UserPosDto) {
    this.setAllKeys(item);
  }

  get roles() {
    return this.item.authorities.map(el => el.authority).join();
  }

  get fio() {
    return `${this.item.firstName} ${this.item.lastName} ${this.item.patronymic || ''}`;
  }

  get tradingPoints() {
    return this.item.points.map(el => el.nameAm).join();
  }

  private setAllKeys(obj: UserPosDto) {
    Object.keys(obj).forEach(key => {
      this[key] = obj[key];
    });
  }
}


export interface PosRkkDataDto {
  creditProgram: CreditProgramDto;
  dirTradingCompanyPoint: DirTradingCompanyPointLightDto;
  goods: ApplicationGoodsGetDto[];

}


export interface DirTradingCompanyPointLightDto extends Dir {
  dirTradingCompany: Dir;
  address: string;
  managers: UserDto[];
}

export interface ApplicationGoodsGetDto {
  applicantId: number;
  applicationId: number;
  brand: string;
  cost: number;
  dirGoods: Dir;
  dirGoodsGroup: Dir;
  id: number;
  quantity: number;
}
