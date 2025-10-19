export class GoodsDto {
  applicantId: number;
  applicationId: number;
  description: string;
  id: number;
  price: number;
  dirGoods: DirGoods;
}

export class GoodsFrontDto {
  applicantId: number;
  applicationId: number;
  description: string;
  id: number;
  price: number;
  dirGoodsId: number;

  constructor(obj: GoodsDto) {
    this.applicantId = obj.applicantId;
    this.applicationId = obj.applicationId;
    this.description = obj.description;
    this.id = obj.id;
    this.price = obj.price;
    this.dirGoodsId = obj.dirGoods ? obj.dirGoods.id : null;
  }
}

export class DirGoods {
  absCode: string;
  active: boolean;
  changedByUsername: string;
  code: string;
  created: string;
  id: number;
  nameAm: string;
  nameEn: string;
  nameRu: string;
  updated: string;
}
