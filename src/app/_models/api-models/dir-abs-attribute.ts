import {Dir, DirAbsCode, DirSalesChannel, ProductRes, Segment} from "@app/_models";
import {ProductToPaymentDay} from "@app/_models/api-models/product-to-payment-day";

export class DirAbsAttribute {
  active: boolean;
  changedByUsername: string;
  code: string;
  created: string | Date;
  defaultValue: string;
  id: number;
  key: string;
  updated: string | Date;
}

export class DirAbsAttributeDto {
  active: boolean;
  changedByUsername: string;
  created: string | Date;
  defaultValue: string;
  id: number;
  key: string;
  updated: string | Date;

  constructor(obj: DirAbsAttribute) {
    this.active = obj.active;
    this.changedByUsername = obj.changedByUsername;
    this.created = obj.created;
    this.defaultValue = obj.defaultValue;
    this.id = obj.id;
    this.key = obj.key;
    this.updated = obj.updated;
  }
}

export class EmptyDirAbsAttributeDto {
  active: boolean = null;
  changedByUsername: string = null;
  created: string | Date = null;
  defaultValue: string = null;
  id: number = null;
  key: string = null;
  updated: string | Date = null;
}
