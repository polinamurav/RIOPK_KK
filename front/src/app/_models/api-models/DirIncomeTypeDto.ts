import { string } from '@amcharts/amcharts4/core';

export class DirIncomeTypeDto {
  absCode: string; // Код АБС

  active: boolean; // Запись активна

  changedByUsername: string; // кем изменено

  created: string; // дата создания записи

  id: number; // идентификатор

  isSum: boolean; // Учитывается в доходе после налогообложения

  nameAm: string; // наименование на армянском

  nameEn: string; // наименование на английском

  nameRu: string; // наименование на русском

  updated: string; // дата обновления записи
}
