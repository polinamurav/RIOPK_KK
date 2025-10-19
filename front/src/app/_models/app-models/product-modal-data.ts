import { Condition, ProductDto, Dir } from '..';

export interface ProductModalData {
  currencies: Dir[];
  conditionData?: Condition;
  productData?: ProductDto[];
  showSendButton?: boolean;
  disabledFields?: boolean;
  title?: string;
}
