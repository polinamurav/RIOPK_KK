export class DirAccountProduct {
  absCode: string;
  active: boolean;
  changedByUsername: string;
  code: string;
  created: string | Date;
  id: number;
  nameEn: string;
  nameAm: string;
  nameRu: string;
  updated: string | Date;
}

export class DirAccountProductDto {
  absCode: string;
  active: boolean;
  changedByUsername: string;
  code: string;
  created: string | Date;
  id: number;
  nameEn: string;
  nameAm: string;
  nameRu: string;
  updated: string | Date;

  constructor(obj: DirAccountProduct) {
    this.absCode = obj.absCode;
    this.active = obj.active;
    this.changedByUsername = obj.changedByUsername;
    this.code = obj.code;
    this.created = obj.created;
    this.id = obj.id;
    this.nameEn = obj.nameEn;
    this.nameAm = obj.nameAm;
    this.nameRu = obj.nameRu;
    this.updated = obj.updated;
  }
}

export class EmptyDirAccountProductDto {
  absCode: string = null;
  active: boolean = null;
  changedByUsername: string = null;
  code: string = null;
  created: string | Date = null;
  id: number = null;
  nameEn: string = null;
  nameAm: string = null;
  nameRu: string = null;
  updated: string | Date = null;
}
