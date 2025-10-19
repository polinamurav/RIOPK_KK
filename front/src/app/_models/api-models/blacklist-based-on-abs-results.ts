// Чёрный список от работодателя по результатам интеграции с АБС

import { Dir } from '@app/_models';

export class BlacklistBasedOnAbsResults {
  address: string; // Адрес
  bllistKind: Dir; // Тип чёрного списка
  documentCountry: Dir; // Страна
  documentNumber: string; // Номер документа
  documentType: Dir; // Тип документа
  findCriteria: number; // Ключ совпадения
  fullNameArm: string; // Полное имя и фамилия
  idCard: string; // Номер ID
  judgeDate: string; // Дата решения
  judgeDecision: string; // Решение суда
  openDate: string; // Дата открытия
  persKind: Dir; // Тип клиента
}
