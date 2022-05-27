import { LocalNames, UserDto } from '@app/_models';

class BaseCustomSettings implements LocalNames {
  created: string | Date;
  id: number;
  key: string;
  nameGe: string;
  nameEn?: string;
  nameRu: string;
  parameterBoolean: boolean | string | null;
  parameterInt: number | null;
  parameterString: string | null;
  parameterDouble: number | string | null;
  updated: string | Date;
}
export interface CustomSettingsDto extends BaseCustomSettings {
  updater: UserDto;
  parameter?: number | string | boolean | null;
}

export interface UpdateCustomSettingsDto extends BaseCustomSettings {
  updatedBy: number;
}

export interface CustomSettings extends CustomSettingsDto {
  updatedBy: number;
}

export interface IParameters {
  key?: string;
  nameGe?: string;
  nameRu?: string;
  nameEn?: string;
  parameterBoolean: boolean | string | null;
  parameterInt: number | null;
  parameterString: string | null;
  parameterDouble: number | string | null;
}
