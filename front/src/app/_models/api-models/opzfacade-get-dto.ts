import { DirIncomeType } from '@app/_models';

export interface OPZFacadeGetDto {
  opzIncomeGetDtoList: OPZIncomeGetDto[];
  opzWorkExperienceDtoList: OPZWorkExperienceDto[];
  opzJobTitleDtoList: OPZJobTitleDto[];
}

export interface OPZFacadePostDto {
  opzIncomePostDtoList: OPZIncomePostDto[];
  opzWorkExperienceDtoList: OPZWorkExperienceDto[];
  opzJobTitleDtoList: OPZJobTitleDto[];
}

export interface OPZIncomeGetDto {
  applicationId?: number; //   Идентификатор заявки
  comment?: string; //  Комментарий
  dirIncomeType?: DirIncomeType;
  id?: number; //  Идентификатор
  income?: number; //  Доход
  isOPZ?: boolean; //
  opzIncome?: number; //  Доход ОПЗ

  isDefaultRow?: boolean; // default first row
}

export interface OPZIncomePostDto {
  applicationId?: number; //   Идентификатор заявки
  comment?: string; //  Комментарий
  dirIncomeTypeId?: number; // Идентификатор типа дохода
  id?: number; //  Идентификатор
  income?: number; //  Доход
  isOPZ?: boolean; //
  opzIncome?: number; //  Доход ОПЗ
}

export interface OPZWorkExperienceDto {
  applicationId: number; //   Идентификатор заявки
  comment: string; //  Комментарий
  continuousLos: number; //   Стаж
  continuousLosOPZ: number; //   Стаж ОПЗ
  id: number; //   Идентификатор
  inn: string; //  ИНН
  isOPZ: boolean; //
  incomeSource: string;
  name: string;
}

export interface OPZJobTitleDto {
  applicationId: number; //   Идентификатор заявки
  isBoss: boolean; //
  isBossOPZ: boolean; //
  comment: string; //  Комментарий
  id: number; //   Идентификатор
  inn: string; //  ИНН
  jobPositionId: number; //   Идентификатор должности
  isOPZ: boolean; //
  name: string;
}
