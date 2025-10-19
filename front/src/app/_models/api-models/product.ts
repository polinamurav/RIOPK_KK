import { Dir, DirAbsCode, Directory, DirSalesChannel } from './directory';

import { Segment } from './segment';
import { ProductToPaymentDay } from '@app/_models/api-models/product-to-payment-day';
import { DirAccountProduct } from '@app/_models/api-models/dir-account-product';
import { DirScheduleType } from '@app/_models/api-models/dir-schedule-type';
import { DirScheduleFrequency } from '@app/_models/api-models/dir-schedule-frequency';
import { DirCurrency } from '@app/_models';

export class Product {
  absCode: string;
  absId: string;
  active: boolean;
  cardAccountProduct: DirAccountProduct;
  changedByUsername: string;
  channels: DirSalesChannel[];
  code: string;
  created: string | Date;
  currAccountProduct: DirAccountProduct;
  cutOffScore: number;
  dateFrom: string | Date;
  dateTo: string | Date;
  forCard: boolean;
  forRef: boolean;
  highCoefLess1000: number;
  highCoefMore1000: number;
  id: number;
  instAccountProduct: DirAccountProduct;
  isComRestr: boolean;
  isCurrentAccount: boolean;
  isExistingCard: boolean;
  isForcedRestr: boolean;
  isInsurance: boolean;
  isOverdraft: boolean;
  isUniqueProduct: boolean;
  isVisibleOnline: boolean;
  lowCoefLess1000: number;
  lowCoefMore1000: number;
  nameEn: string;
  nameAm: string;
  nameRu: string;
  paymentDays: ProductToPaymentDay[];
  productGroupId: string;
  scheduleFreq: DirScheduleFrequency[];
  scheduleTypes: DirScheduleType[];
  scoringType: number;
  segments: Segment[];
  updated: string | Date;
}

export class ProductDto extends Dir {
  absCode: string;
  absId: string;
  channels: DirSalesChannel[];
  cardAccountProduct: DirAbsCode;
  currAccountProduct: DirAbsCode;
  cutOffScore: number;
  dateFrom: string | Date;
  dateTo: string | Date;
  forCard: boolean;
  code: string;
  baseProductId: string;
  baseProductName: string;
  forRef: boolean;
  highCoefLess1000: number;
  highCoefMore1000: number;
  instAccountProduct: DirAbsCode;
  isComRestr: boolean;
  isCurrentAccount: boolean;
  isExistingCard: boolean;
  isForcedRestr: boolean;
  isInsurance: boolean;
  isOverdraft: boolean;
  isPreapprove: boolean;
  isUniqueProduct: boolean;
  isVisibleOnline: boolean;
  lowCoefLess1000: number;
  lowCoefMore1000: number;
  paymentDays: ProductToPaymentDay[];
  productGroupId: string;
  scheduleFreq: Dir[];
  scheduleTypes: DirAbsCode[];
  scoringType: number;
  segments: Segment[];
}

export class ProductResDto {
  absCode: string;
  absId: string;
  active: boolean;
  cardAccountProduct: DirAbsCode;
  currAccountProduct: DirAbsCode;
  cutOffScore: number;
  changedByUsername: string;
  channels: Directory[];
  code: string;
  created: string | Date;
  dateFrom: string | Date;
  dateTo: string | Date;
  forCard: boolean;
  forRef: boolean;
  highCoefLess1000: number;
  highCoefMore1000: number;
  instAccountProduct: DirAbsCode;
  id: number;
  isComRestr: boolean;
  isCurrentAccount: boolean;
  isExistingCard: boolean;
  isForcedRestr: boolean;
  isInsurance: boolean;
  isOverdraft: boolean;
  isUniqueProduct: boolean;
  isVisibleOnline: boolean;
  lowCoefLess1000: number;
  lowCoefMore1000: number;
  nameAm: string;
  nameEn: string;
  nameRu: string;
  paymentDays: ProductToPaymentDay[];
  productGroupId: string;
  scheduleFreq: Dir[];
  scheduleTypes: DirAbsCode[];
  scoringType: number;
  segments: Segment[];
  updated: string | Date;

  constructor(productRes: ProductDto) {
    this.setAllKeys(productRes);
    this.absCode = productRes.absCode;
    this.absId = productRes.absId;
    this.active = productRes.active;
    this.cardAccountProduct = productRes.cardAccountProduct;
    this.currAccountProduct = productRes.currAccountProduct;
    this.cutOffScore = productRes.cutOffScore;
    this.changedByUsername = productRes.changedByUsername;
    this.channels = productRes.channels;
    this.code = productRes.code;
    this.created = productRes.created;
    this.dateFrom = productRes.dateFrom;
    this.dateTo = productRes.dateTo;
    this.forCard = productRes.forCard;
    this.forRef = productRes.forRef;
    this.highCoefLess1000 = productRes.highCoefLess1000;
    this.highCoefMore1000 = productRes.highCoefMore1000;
    this.instAccountProduct = productRes.instAccountProduct;
    this.id = productRes.id;
    this.isComRestr = productRes.isComRestr;
    this.isCurrentAccount = productRes.isCurrentAccount;
    this.isExistingCard = productRes.isExistingCard;
    this.isForcedRestr = productRes.isForcedRestr;
    this.isInsurance = productRes.isInsurance;
    this.isOverdraft = productRes.isOverdraft;
    this.isUniqueProduct = productRes.isUniqueProduct;
    this.isVisibleOnline = productRes.isVisibleOnline;
    this.lowCoefLess1000 = productRes.lowCoefLess1000;
    this.lowCoefMore1000 = productRes.lowCoefMore1000;
    this.nameAm = productRes.nameAm;
    this.nameEn = productRes.nameEn;
    this.nameRu = productRes.nameRu;
    this.paymentDays = productRes.paymentDays;
    this.productGroupId = productRes.productGroupId;
    this.scheduleFreq = productRes.scheduleFreq;
    this.scheduleTypes = productRes.scheduleTypes;
    this.scoringType = productRes.scoringType;
    this.segments = productRes.segments;
    this.updated = productRes.updated;
  }

  private setAllKeys(obj: ProductDto) {
    Object.keys(obj).forEach(key => {
      this[key] = obj[key];
    });
  }
}

export class EmptyProductResDto {
  absCode: string = null;
  absId: string = null;
  active: boolean = null;
  cardAccountProduct: DirAbsCode = null;
  currAccountProduct: DirAbsCode = null;
  cutOffScore: number = null;
  changedByUsername: string = null;
  channels: DirSalesChannel[] = [];
  code: string = null;
  created: string | Date = null;
  dateFrom: string | Date = null;
  dateTo: string | Date = null;
  forCard: boolean = null;
  forRef: boolean = null;
  highCoefLess1000: number = null;
  highCoefMore1000: number = null;
  instAccountProduct: DirAbsCode = null;
  id: number = null;
  isComRestr: boolean = null;
  isCurrentAccount: boolean = null;
  isExistingCard: boolean = null;
  isInsurance: boolean = null;
  isVisibleOnline: boolean = null;
  isForcedRestr: boolean = null;
  isOverdraft: boolean = null;
  isUniqueProduct: boolean = null;
  lowCoefLess1000: number = null;
  lowCoefMore1000: number = null;
  nameAm: string = null;
  nameEn: string = null;
  nameRu: string = null;
  paymentDays: ProductToPaymentDay[] = [];
  productGroupId: string = null;
  scheduleFreq: Dir[] = [];
  scheduleTypes: DirAbsCode[] = [];
  segments: Segment[] = [];
  scoringType: number = null;
  updated: string | Date = null;

  private setAllKeys(product: any) {}
}

export interface ProductCondition {
  active: boolean; //  Запись активна

  changedByUsername: string; // Кем изменено

  corp_tariff_id: string; //  Сегмент корпоративной компании (А, В или С, если компания в списке справочника корп канала, XXX - если компания не содержится в списке)

  created: string;
  currency: DirCurrency;
  dirLoanTermType: Dir; // Код срока кредита

  filial: string; // Коды филиалов, в рамках которых может быть установлена иная ставка или параметры кредита

  id: number;
  isInsuranceAccidentChosen: boolean; // Признак того, выбрана ли страховка

  isNoWorkplace: boolean; // Признак клиента, по которому отсутствуют данные о доходах во внешних истониках

  isPreapprove: boolean; // Признак предодобренного кредита

  isPureRef: boolean; // Признак рефинансируемого кредита (чистый реф)

  isRef: boolean; // Признак рефинансируемого кредита (mix)

  isSalary: boolean; // Признак зарплатного клиента

  isVip: boolean; // isVip
  maxAmount: number; // Максимальная сумма кредита

  maxTerm: number; // Максимальный срок кредита

  minAmount: number; // Минимальная сумма кредита

  minTerm: number; // Минимальный срок кредита

  multiplicity: string; // Кратность

  pattern: string; // Шаблон из АБС (некий код продукта из АБС для мапинга даннных в АБС)

  preapproveBase: string; // База для расчета предодобренного кредита

  product: string; // Id продукта

  profile: string; // Профайл. Используется только для карточных продуктов. (некий код из АБС для мапинга даннных в АБС)

  rateBasic: number; //Годовая процентная ставка

  rateFutureSalaryDiscount: number; //Скидка по годовой ставке для клиента, если он обещает перевести зарплату в ВТБ

  updated: string;
}
