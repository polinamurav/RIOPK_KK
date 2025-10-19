import { ELanguage } from '@app/constants/language';

export function getLangNameCol<T>(currentLang: string, obj: any): T {
  if (!!obj && !!currentLang) {
    if (currentLang === ELanguage.Am) {
      return obj.nameAm;
    } else if (currentLang === ELanguage.Ru) {
      return obj.nameRu;
    } else {
      return obj.nameEn;
    }
  } else {
    return null;
  }
}
