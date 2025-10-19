import { EInputType, TableDataHeader } from '@app/_models';

import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';
import { getMinDate } from '@app/services/util/getMinDate';

// tslint:disable-next-line: max-line-length

export const PRODUCT_DISCOUNT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'Administration.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'Administration.TableHeaders.Product', 'am', 'product.nameAm'),
  new TableDataHeader('channels', 'Administration.Placeholders.Channel', 'string', 'channels'),
  // new TableDataHeader('channels.nameAm', 'Administration.Placeholders.Channel', 'am', 'channels.nameAm'),
  new TableDataHeader('segments', 'Administration.Placeholders.Segment', 'string', 'segments'),
  new TableDataHeader('rateDiscount', 'Administration.TableHeaders.DiscountAmount', 'string', 'rateDiscount'),
  new TableDataHeader('dateFrom', 'Administration.TableHeaders.BeginDate', 'date', 'dateFrom'),
  new TableDataHeader('dateTo', 'Administration.TableHeaders.EndDate', 'date', 'dateTo')
];

export const PRODUCT_DISCOUNT_FORM: AdmBaseModalFormField[] = [
  {
    code: 'productId',
    type: EInputType.Select,
    placeholder: 'Administration.TableHeaders.Product',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'productCategory',
    class: 'col-6'
  },
  {
    code: 'salesChannelId',
    type: EInputType.Select,
    placeholder: 'Administration.Placeholders.Channel',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'salesChanel',
    class: 'col-6'
  },
  {
    code: 'segmentId',
    type: EInputType.Select,
    placeholder: 'Administration.Placeholders.Segment',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'segment',
    class: 'col-6'
  },
  {
    code: 'rateDiscount',
    type: EInputType.Number,
    placeholder: 'Administration.TableHeaders.DiscountAmount',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 2,
    minLength: 1,
    class: 'col-6 mr-40'
  },
  {
    code: 'dateFrom',
    type: EInputType.Date,
    placeholder: 'Administration.TableHeaders.BeginDate',
    minDate: getMinDate(new Date()),
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-6'
  },
  {
    code: 'dateTo',
    type: EInputType.Date,
    placeholder: 'Administration.TableHeaders.EndDate',
    minDate: getMinDate(new Date()),
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-6'
  }
];
