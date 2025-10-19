import { EInputType, TableDataHeader } from '@app/_models';
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const ACCOUNT_PRODUCT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Administration.TableHeaders.AccountProduct.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'Administration.TableHeaders.AccountProduct.Name', 'ru', 'nameRu'),
  new TableDataHeader('nameAm', 'Administration.TableHeaders.AccountProduct.Name', 'am', 'nameAm'),
  new TableDataHeader('nameEn', 'Administration.TableHeaders.AccountProduct.Name', 'en', 'nameEn'),
  new TableDataHeader('absCode', 'Administration.TableHeaders.AccountProduct.AbsCode', 'string', 'absCode'),
  new TableDataHeader('active', 'Administration.TableHeaders.AccountProduct.Active', 'status', 'active'),
  new TableDataHeader('created', 'Administration.TableHeaders.AccountProduct.Created', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'Administration.TableHeaders.AccountProduct.Updated', 'dateAndTime', 'updated'),
  new TableDataHeader(
    'changedByUsername',
    'Administration.TableHeaders.AccountProduct.ChangedByUsername',
    'string',
    'changedByUsername'
  )
];

export const ACCOUNT_PRODUCT_FORM: AdmBaseModalFormField[] = [
  {
    code: 'code',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.Code',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'absCode',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.ABCCode',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'nameRu',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.NameRu',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'nameAm',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.NameAm',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'nameEn',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.NameEn',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.Activ',
    required: true,
    disabled: false,
    readonly: false
  }
];
