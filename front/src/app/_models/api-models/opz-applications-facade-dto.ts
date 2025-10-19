// Заявки работодателя из АБС и РКК

export class OpzApplicationsFacadeDto {
  applicationId: number; // Номер заявки
  dirBranch: DirBranch;
  inn: number; // ИНН

  innerInformationApplicationStatusDto: AbsAndRkkDto; // Статус заявки из АБС или РКК
  innerInformationProductSubTypeDto: AbsAndRkkDto; // Подтип кредита из АБС или РКК
  innerInformationRoleDto: AbsAndRkkDto; // Роль клиента из АБС или РКК
}

export class DirBranch {
  absDirBranchResponseId: string;
  active: boolean;
  changedByUsername: string;
  city: string;
  code: string;
  created: string;
  endDate: string;
  headName: string;
  id: number;
  license: string;
  nameAm: string;
  nameRu: string;
  openedBranch: boolean;
  phone: string;
  startDate: string;
  street: string;
  updated: string;
}
export class StatusReports {
  id: number;
  nameAm: string;
  nameRu: string;
  nameEn: string;
}
export class AbsAndRkkDto {
  codeAbs?: number;
  id: string;
  isFromAbs: boolean;
  nameRu: string;
  nameAm: string;
}
