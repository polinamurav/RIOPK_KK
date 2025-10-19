import { Dir } from '@app/_models';

export interface PreapproveFrontDto {
  buttonsSettings: ButtonsSettings;
  preapproveBase: PreapproveBaseDto;
}

export interface ButtonsSettings {
  isActivateVisible: boolean; //  Кнопка ‘Активировать базу’ видна

  isCorrectedResultVisible: boolean; //  Кнопка ‘Выгрузить скорректированный результат’ видна

  isDeclinedClientsVisible: boolean; //  Кнопка ‘Выгрузить исключенных’ видна

  isResultVisible: boolean; //  Кнопка ‘Выгрузить результат стратегии’ видна

  isUploadCorrectedVisible: boolean; //  Кнопка ‘Загрузить корректировку’ видна
}

export interface PreapproveBaseDto {
  activateDate?: string; //  Дата активации
  created?: string; //  Дата создания
  endDate?: string; //  Срок действия
  id?: number; //  Уникальный идентификатор
  clientsCount?: number; // Количество клиентов в базе
  name?: string; //  Название базы
  details?: string; //  описание базы
  fileName?: string; //  Имя файла
  productId?: number; //   ID Продукта
  statusId?: string; //  Статус
  statusNameAm: string; //
  statusNameRu: string; //
  isUploadSuccess: boolean; // Файл загружен
}

export interface PreapproveBaseStartDto {
  acraEnabled: boolean; //   АКРА ВКЛ/ВЫКЛ

  blackListEnabled: boolean; // Стоп листы ВКЛ/ВЫКЛ

  ekengGosRegistrEnabled: boolean; // ЭКЕНГ гос регистр ВКЛ/ВЫКЛ

  ekengPekEnabled: boolean; // ЕКЕНГ ПЭК ВКЛ/ВЫКЛ

  ichEnabled: boolean; // Внутренняя кред. история ВКЛ/ВЫКЛ

  norqEnabled: boolean; // НОРК ВКЛ/ВЫКЛ

  employerApplicationsEnabled: boolean; // НОРК ВКЛ/ВЫКЛ

  preapproveBaseId: number;
}
