export interface DirCorpCompanyDto {
  active: boolean; //  запись активна
  absCode: string; //  Клиентский код организации в АБС
  accreditationDate: string; //  Дата аккредитации
  branchCode: string; // Номер филиала к которому организация привязана
  changedByUsername: string; // кем изменено
  code: string; // Код корп канала
  comment: string; // Комментарии
  created: string; // дата создания записи
  employeeNumber: string; // Кол-во сотрудников
  id: number; // идентификатор
  industry: string; //  Сфера организации
  isAccreditation: boolean; //  Аккредитация
  isPeopleOfAction: boolean;
  isSalaryProject: boolean;
  legalForm: string; //  Инн
  nameAm: string; // наименование на армянском
  nameEn: string; // наименование на английском
  nameRu: string; // наименование на русском
  numberForSalaryCard: string; // Номер предприятия для з/п карт
  salaryFund: number; // Зарплатный фонд организации
  salaryProjectDate: string; // Дата подписания зарплатного проекта
  segment: string; // Сегмент Корп канала
  status: string; // Статус Организации
  updated: any; // дата обновления записи
  name?: string;
  inn?: string;
}

export interface DirParamsDto {
  code?: string; //  код

  inn?: string; // Инн

  nameAm?: string;
}
