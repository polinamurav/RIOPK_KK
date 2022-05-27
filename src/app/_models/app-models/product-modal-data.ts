import { Condition, ProductRes, Dir } from '..';

export interface ProductModalData {
  currencies: Dir[];
  conditionData?: Condition;
  productData?: ProductRes[];
  showSendButton?: boolean;
  disabledFields?: boolean;
  title?: string;
}
