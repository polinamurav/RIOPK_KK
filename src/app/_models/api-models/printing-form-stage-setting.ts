import { DirStage, PrintingForm } from '..';

import { ProductRes } from './product';
import { getId } from '@app/services/util/getId';

export class PrintingFormStageSetting {
  active: boolean;
  changedByUsername: string;
  created: string | Date;
  id: number;
  printingForm: PrintingForm;
  product: ProductRes;
  productGroupId: string;
  stage: DirStage;
  updated: string | Date;
}

export class EmptyPrintingFormStageSetting {
  active: boolean = null;
  changedByUsername: string = null;
  created: string | Date = null;
  id: number = null;
  printingFormId: string = null;
  productGroupId: string = null;
  productId: number = null;
  stageId: string = null;
  updated: string | Date = null;
}

export class PrintingFormStageSettingDto {
  active: boolean;
  changedByUsername: string;
  created: string | Date;
  id: number;
  printingFormId: string;
  productGroupId: string;
  productId: number;
  stageId: string;
  updated: string | Date;

  constructor(obj: PrintingFormStageSetting) {
    this.active = obj.active;
    this.changedByUsername = obj.changedByUsername;
    this.created = obj.created;
    this.id = obj.id;
    this.printingFormId = getId<string>(obj.printingForm) !== null ? getId<string>(obj.printingForm) : null;
    this.productGroupId = obj.productGroupId;
    this.productId = getId(obj.product);
    this.stageId = getId<string>(obj.stage) !== null ? getId<string>(obj.stage) : null;
    this.updated = obj.updated;
  }
}
