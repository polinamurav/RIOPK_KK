import { DirAbsAttribute } from '@app/_models/api-models/dir-abs-attribute';
import { Product } from '@app/_models';
import { getId } from '@app/services/util/getId';

export class DirAbsAttributeSetting {
  changedByUsername: string;
  created: string | Date;
  dirAbsAttribute: DirAbsAttribute;
  id: number;
  product: Product;
  updated: string | Date;
  used: boolean;
  value: string;
}

export class DirAbsAttributeSettingDto {
  changedByUsername: string;
  created: string | Date;
  dirAbsAttributeId: number;
  id: number;
  productId: number;
  updated: string | Date;
  used: boolean;
  value: string;

  constructor(obj: DirAbsAttributeSetting) {
    this.changedByUsername = obj.changedByUsername;
    this.created = obj.created;
    this.dirAbsAttributeId = getId(obj.dirAbsAttribute);
    this.id = obj.id;
    this.productId = getId(obj.product);
    this.updated = obj.updated;
    this.used = obj.used;
    this.value = obj.value;
  }
}

export class EmptyDirAbsAttributeSettingDto {
  changedByUsername: string = null;
  created: string | Date = null;
  dirAbsAttributeId: number = null;
  id: number = null;
  productId: number = null;
  updated: string | Date = null;
  used: boolean = null;
  value: string = null;
}
