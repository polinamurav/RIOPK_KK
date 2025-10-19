import { Dir, UserDto } from '@app/_models';

export interface DirTradingCompanyDto extends Dir {
  companyName: string;
  dirTradingCompanyPoints: DirTradingCompanyPointDto[];
  status: Dir;
  nameAm: string;
  nameRu: string;
  displayName?: string;
}

export class DirTradingCompanyPointDto {
  active: boolean; // запись активна

  address: string; //   Адрес торговой точки

  bankAccount: string; //    Счет в банке

  branch: Dir; //    Филиал

  brand: string; //    Бренд

  changedByUsername: string; //
  closeDate: string; //    Дата открытия

  code: string; //    код

  created: string; //
  creditPrograms: CreditProgramDto[]; //  Кредитные програмы

  dirTradingCompany: DirTradingCompanyDto;

  id: number; //

  defaultLimit: number; //

  isOpz: boolean; // ОПЗ (ДА/НЕТ)
  isDefaultLimit: boolean; // ОПЗ (ДА/НЕТ)

  manager: string; //  Менеджер
  managers: UserDto[]; //  Менеджер

  nameAm: string; //
  nameEn: string; //
  nameRu: string; //
  openDate: string; //  Дата открытия

  phoneNumber: string; //  Номер телефона

  pointCode: string; //   Уникальный код торговой точки

  status: Dir;
  updated: string; //
  comment: string; //
  interconnectedPoint: string; //

  users: UserDto[]; //  Пользователи относящиеся к этой точке
}

export interface CreditProgramDto {
  active: boolean; //   Запись активна

  code: string;

  changedByUsername: string; //   Кем изменено

  commissionMonthly: number; //   Ежемесячная комиссия

  created: string; //   Дата создания

  dirCurrencyId: string; //   Код валюты

  gracePeriod: number; //   Льготный период

  id: number; //   Id
  maxAmount: number; //   Максимальная сумма по продукту

  maxTerm: number; //   Максимальный срок по продукту

  minAmount: number; //   Минимальная сумма по продукту

  minTerm: number; //   Минимальный срок по продукту

  name: string; //   Наименование кредитной программы

  productCode: string; //   Подтип кредита

  rateBasic: number; //   Базовая ставка по продукту

  rateDiscount: number; //   Размер дисконта

  updated: string; //   Дата обновления
}

export interface CreditProgramDto {
  active: boolean; //  Запись активна

  changedByUsername: string; //  Кем изменено

  commissionMonthly: number; //   Ежемесячная комиссия

  created: string; //  Дата создания

  dirCurrencyId: string; //  Код валюты

  gracePeriod: number; //  Льготный период

  id: number; //  Id
  maxAmount: number; //  Максимальная сумма по продукту

  maxTerm: number; //  Максимальный срок по продукту

  minAmount: number; //  Минимальная сумма по продукту

  minTerm: number; //  Минимальный срок по продукту

  name: string; //  Наименование кредитной программы

  productCode: string; //  Подтип кредита

  rateBasic: number; //  Базовая ставка по продукту

  rateDiscount: number; //  Размер дисконта

  updated: string; //  Дата обновления
}

export class DirTradingCompanyPointForTable {
  constructor(public item: DirTradingCompanyPointDto) {
    this.setAllKeys(item);
  }

  get creditProgramsJoin() {
    return this.item.creditPrograms.map(el => el.code).join();
  }

  get branchCodeAm() {
    return this.item.branch.code ? this.item.branch.code : '';
  }

  get branchCodeRu() {
    return this.item.branch.code ? this.item.branch.code : '';
  }

  get usersJoin() {
    return this.item.users.map(el => el.fio).join();
  }

  get managersJoin() {
    return this.item.managers.map(el => el.fio).join();
  }

  private setAllKeys(obj: DirTradingCompanyPointDto) {
    Object.keys(obj).forEach(key => {
      this[key] = obj[key];
    });
  }
}
