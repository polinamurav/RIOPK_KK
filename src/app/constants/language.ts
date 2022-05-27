import { CustomOptionList } from '@app/_models';

export enum ELanguage {
  Ru = 'ru',
  Ge = 'ge'
}

export enum LanguagesList {
  GE = 'GE',
  RU = 'RU',
  EN = 'EN'
}

export const LANGUAGES: CustomOptionList[] = [
  { id: '0', name: LanguagesList.GE },
  { id: '1', name: LanguagesList.RU },
  { id: '2', name: LanguagesList.EN }
];

export function getLanguageIdByName(name: LanguagesList): number | string {
  return LANGUAGES.find(lang => lang.name === name).id;
}

export function getLanguageNameById(id: number): string {
  return LANGUAGES.find(lang => lang.id === id).name;
}

export const CURRENCY_NAME = 'GEL';

export enum ELanguageType {
  ru = 'nameRu',
  ge = 'nameGe',
  en = 'nameEn'
}
