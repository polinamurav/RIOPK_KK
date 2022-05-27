import { EInputType, TableDataHeader, ValueType } from '@app/_models';

import { AdmBaseModalFormField } from '@app/shared/modals/administration-base-modal/constants/administration-base-modal.constants';

export const PRODUCT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Administration.TableHeaders.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'Administration.TableHeaders.ProductName', 'ru', 'nameRu'),
  new TableDataHeader('nameGe', 'Administration.TableHeaders.ProductName', 'ge', 'nameGe'),
  new TableDataHeader('nameEn', 'Administration.TableHeaders.ProductName', 'en', 'nameEn'),
  new TableDataHeader('scoringType', 'Administration.TableHeaders.ScoringType', 'string', 'scoringType'),
  new TableDataHeader('dateFrom', 'Administration.TableHeaders.DateFrom', 'date', 'dateFrom'),
  new TableDataHeader('dateTo', 'Administration.TableHeaders.DateTo', 'date', 'dateTo'),
  new TableDataHeader('absCode', 'Administration.TableHeaders.AbsCode', 'string', 'absCode'),
  new TableDataHeader('isExistingCard', 'Administration.TableHeaders.IsExistingCard', 'status', 'isExistingCard'),
  new TableDataHeader('highCoefMore1000', 'Administration.TableHeaders.HighCoefMore1000', 'string', 'highCoefMore1000'),
  new TableDataHeader('lowCoefMore1000', 'Administration.TableHeaders.LowCoefMore1000', 'string', 'lowCoefMore1000'),
  new TableDataHeader('highCoefLess1000', 'Administration.TableHeaders.HighCoefLess1000', 'string', 'highCoefLess1000'),
  new TableDataHeader('lowCoefLess1000', 'Administration.TableHeaders.LowCoefLess1000', 'string', 'lowCoefLess1000'),
  new TableDataHeader('isOverdraft', 'Administration.TableHeaders.IsOverdraft', 'status', 'isOverdraft'),
  new TableDataHeader('isUniqueProduct', 'Administration.TableHeaders.IsUniqueProduct', 'status', 'isUniqueProduct'),
  new TableDataHeader('isComRestr', 'Administration.TableHeaders.IsComRestr', 'status', 'isComRestr'),
  new TableDataHeader('isForcedRestr', 'Administration.TableHeaders.IsForcedRestr', 'status', 'isForcedRestr'),
  new TableDataHeader('forRef', 'Administration.TableHeaders.ForRef', 'toggleDisabled', 'forRef'),
  new TableDataHeader('forCard', 'Administration.TableHeaders.ForCard', 'toggleDisabled', 'forCard'),
  new TableDataHeader('isInsurance', 'Administration.TableHeaders.IsInsurance', 'toggleDisabled', 'isInsurance'),
  new TableDataHeader('active', 'Administration.TableHeaders.Active', 'status', 'active'),
  new TableDataHeader(
    'currAccountProduct.nameRu',
    'Administration.TableHeaders.CurrAccountProduct',
    'ru',
    'currAccountProduct'
  ),
  new TableDataHeader(
    'currAccountProduct.nameGe',
    'Administration.TableHeaders.CurrAccountProduct',
    'ge',
    'currAccountProduct'
  ),
  new TableDataHeader(
    'currAccountProduct.nameEn',
    'Administration.TableHeaders.CurrAccountProduct',
    'en',
    'currAccountProduct'
  ),
  new TableDataHeader(
    'cardAccountProduct.nameRu',
    'Administration.TableHeaders.CardAccountProduct',
    'ru',
    'cardAccountProduct'
  ),
  new TableDataHeader(
    'cardAccountProduct.nameGe',
    'Administration.TableHeaders.CardAccountProduct',
    'ge',
    'cardAccountProduct'
  ),
  new TableDataHeader(
    'cardAccountProduct.nameEn',
    'Administration.TableHeaders.CardAccountProduct',
    'en',
    'cardAccountProduct'
  ),
  new TableDataHeader(
    'instAccountProduct.nameRu',
    'Administration.TableHeaders.InstAccountProduct',
    'ru',
    'instAccountProduct'
  ),
  new TableDataHeader(
    'instAccountProduct.nameGe',
    'Administration.TableHeaders.InstAccountProduct',
    'ge',
    'instAccountProduct'
  ),
  new TableDataHeader(
    'instAccountProduct.nameEn',
    'Administration.TableHeaders.InstAccountProduct',
    'en',
    'instAccountProduct'
  )
];

export const PRODUCT_FORM: AdmBaseModalFormField[] = [
  {
    code: 'code',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.Code',
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
    code: 'nameGe',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.NameGe',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'nameEn',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.NameEn',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'productGroupId',
    type: EInputType.CustomSelect,
    placeholder: 'Administration.Placeholders.GroupProducts',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'productGroupList',
    customListValueName: 'id'
  },
  {
    code: 'absCode',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.AbsCode',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'dateFrom',
    type: EInputType.Date,
    placeholder: 'Administration.Placeholders.DateFrom',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'dateTo',
    type: EInputType.Date,
    placeholder: 'Administration.Placeholders.DateTo',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'scoringType',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.ScoringType',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'blank',
    type: EInputType.Blank,
    placeholder: 'blank',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'isExistingCard',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.IsExistingCard',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'forRef',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.ForRef',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.Active',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'forCard',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.ForCard',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'isVisibleOnline',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.IsVisibleOnline',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'isInsurance',
    type: EInputType.Checkbox,
    placeholder: 'Administration.TableHeaders.IsInsurance',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'currAccountProduct',
    type: EInputType.Select,
    placeholder: 'Modals.Placeholder.CurrAccountProduct',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'accountProductList',
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'cardAccountProduct',
    type: EInputType.Select,
    placeholder: 'Modals.Placeholder.CardAccountProduct',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'accountProductList',
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'instAccountProduct',
    type: EInputType.Select,
    placeholder: 'Modals.Placeholder.InstAccountProduct',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'accountProductList',
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'absId',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.AbsId',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'cutOffScore',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.CutOffScore',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'highCoefLess1000',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.HighCoefLess1000',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'highCoefMore1000',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.HighCoefMore1000',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'lowCoefLess1000',
    type: EInputType.Number,
    placeholder: 'Administration.Placeholders.LowCoefLess1000',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'isComRestr',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.IsComRestr',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'isCurrentAccount',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.IsCurrentAccount',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'isForcedRestr',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.IsForcedRestr',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'isOverdraft',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.IsOverdraft',
    required: false,
    disabled: false,
    readonly: false
  },
  {
    code: 'isUniqueProduct',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.IsUniqueProduct',
    required: false,
    disabled: false,
    readonly: false
  },
];
