import { DirAccountProduct } from '@app/_models/api-models/dir-account-product';
import { DirExpenseType } from '@app/_models/api-models/dir-expense-type';
import { getId } from '@app/services/util/getId';

export class AbsExpenseSetting {
  active: boolean;
  appearance: number;
  dirAccountProduct: DirAccountProduct;
  dirExpenseType: DirExpenseType;
  id: number;
  interval: number;
  intervalStep: number;
  oneTimeFeeDate: string | Date;
  value: number;
}

export class AbsExpenseSettingDto {
  active: boolean;
  appearance: number;
  dirAccountProductId: number;
  dirExpenseTypeId: number;
  id: number;
  interval: number;
  intervalStep: number;
  oneTimeFeeDate: string | Date;
  value: number;

  constructor(obj: AbsExpenseSetting) {
    this.active = obj.active;
    this.appearance = obj.appearance;
    this.dirAccountProductId = getId(obj.dirAccountProduct);
    this.dirExpenseTypeId = getId(obj.dirExpenseType);
    this.id = obj.id;
    this.interval = obj.interval;
    this.intervalStep = obj.intervalStep;
    this.oneTimeFeeDate = obj.oneTimeFeeDate;
    this.value = obj.value;
  }
}

export class EmptyAbsExpenseSettingDto {
  active: boolean = null;
  appearance: number = null;
  dirAccountProductId: number = null;
  dirExpenseTypeId: number = null;
  id: number = null;
  interval: number = null;
  intervalStep: number = null;
  oneTimeFeeDate: string | Date = null;
  value: number = null;
}
