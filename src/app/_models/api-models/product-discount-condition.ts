import { Directory, ProductRes, Segment } from '..';

import { getId } from '@app/services/util/getId';

export class ProductDiscountCondition {
  changedByUsername: string;
  created: string | Date;
  dateFrom: Date;
  dateTo: Date;
  id: number;
  product: ProductRes;
  rateDiscount: number;
  salesChannel: Directory;
  segment: Segment;
  updated: string | Date;
}

export class EmptyProductDiscountConditionDto {
  changedByUsername: string = null;
  created: string | Date = null;
  dateFrom: Date = null;
  dateTo: Date = null;
  id: number = null;
  productId: number = null;
  rateDiscount: number = null;
  salesChannelId: number = null;
  segmentId: string = null;
  updated: string | Date = null;
}

export class ProductDiscountConditionDto {
  changedByUsername: string;
  created: string | Date;
  dateFrom: Date;
  dateTo: Date;
  id: number;
  productId: number;
  rateDiscount: number;
  salesChannelId: number;
  segmentId: string;
  updated: string | Date;

  constructor(obj: ProductDiscountCondition) {
    this.changedByUsername = obj.changedByUsername;
    this.created = obj.created;
    this.dateFrom = obj.dateFrom;
    this.dateTo = obj.dateTo;
    this.id = obj.id;
    this.productId = getId(obj.product);
    this.rateDiscount = obj.rateDiscount;
    this.salesChannelId = getId(obj.salesChannel);
    this.segmentId = getId<string>(obj.segment) !== null ? getId<string>(obj.segment) : null;
    this.updated = obj.updated;
  }
}
