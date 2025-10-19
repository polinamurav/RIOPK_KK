import { BaseDir } from './directory';
import { ProductGroup } from '@app/constants/product-group';

export class BRMSRuleType extends BaseDir {
  id: string;
}

export class BRMSRuleGroupDto extends BaseDir {
  id: string;
}

export class BRMSRule extends BaseDir {
  brmsRuleGroup: BRMSRuleGroupDto;
  brmsRuleType: BRMSRuleType;
  isVisibleForManager: boolean;
  productGroupId: ProductGroup;
  id: string;
}

export class BRMSRuleDTO {
  active: boolean;
  brmsRuleTypeId: string;
  brmsRuleGroupId: string;
  changedByUsername: string;
  created: string | Date;
  id: string;
  nameAm: string;
  nameEn: string;
  nameRu: string;
  updated: string | Date;

  constructor(data: BRMSRule) {
    this.active = data.active;
    this.brmsRuleTypeId = data.brmsRuleType ? data.brmsRuleType.id : null;
    this.changedByUsername = data.changedByUsername;
    this.created = data.created;
    this.id = data.id;
    this.nameAm = data.nameAm;
    this.nameEn = data.nameEn;
    this.nameRu = data.nameRu;
    this.updated = data.updated;
  }
}
