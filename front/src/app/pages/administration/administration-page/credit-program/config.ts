import { EInputType, TableDataHeader, ValueType } from '@app/_models';
// @ts-ignore
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const CREDIT_PROGRAM_HEADERS: TableDataHeader[] = [
  new TableDataHeader(
    'code',
    'Код',
    'string',
    'code'
  ),
  new TableDataHeader(
    'name',
    'Название программы',
    'string',
    'name'
  ),
  new TableDataHeader(
    'product.nameRu',
    'Подтип кредита',
    'ru',
    'product.nameRu'
  ),
  new TableDataHeader(
    'product.nameAm',
    'Подтип кредита',
    'am',
    'product.nameAm'
  ),
  new TableDataHeader('dirGoodsGroupsListRu', 'Товары', 'ru', 'dirGoodsGroupsListRu'),
  new TableDataHeader('dirGoodsGroupsListAm', 'Товары', 'am', 'dirGoodsGroupsListAm'),
  new TableDataHeader('rateDiscount', 'Размер дисконта', 'string', 'rateDiscount'),
  // new TableDataHeader('mm', 'Минимальная предоплата', 'string', 'mm'),
  new TableDataHeader('minTerm', 'Мин срок', 'string', 'minTerm'),
  new TableDataHeader('maxTerm', 'Макс срок', 'string', 'maxTerm'),
  new TableDataHeader('rateBasic', 'Годовая ставка', 'string', 'rateBasic'),
  new TableDataHeader('commissionMonthly', 'Ежемесячная комиссия', 'string', 'commissionMonthly'),
  new TableDataHeader('minAmount', 'Минимальная сумма', 'string', 'minAmount'),
  new TableDataHeader('maxAmount', 'Максимальная сумма', 'string', 'maxAmount'),
  new TableDataHeader('gracePeriodRate', 'Срок льготного периода (0% год ставка)', 'string', 'gracePeriodRate'),
  new TableDataHeader('gracePeriodCommission', 'Срок льготного периода (0% комисссия)', 'string', 'gracePeriodCommission'),
  new TableDataHeader('gracePeriodPayment', 'Срок льготного периода (0 основного долга)', 'string', 'gracePeriodPayment'),
  new TableDataHeader('pattern', 'Шаблон', 'string', 'pattern'),
  new TableDataHeader('comment', 'Комментарии', 'string', 'comment'),

];

export const CREDIT_PROGRAM_FORM: AdmBaseModalFormField[] = [
  {
    code: 'code',
    type: EInputType.Text,
    placeholder: 'Код',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 50,
    // class: 'wide-col'
  },
  {
    code: 'product',
    type: EInputType.Select,
    placeholder: 'Подтип кредита',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'products',
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'name',
    type: EInputType.Text,
    placeholder: 'Название программы',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 100,
    class: 'all-width-row-grid-2'
  },

  {
    code: 'minTerm',
    type: EInputType.Number,
    placeholder: 'Минимальный срок',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 10
  },
  {
    code: 'maxTerm',
    type: EInputType.Number,
    placeholder: 'Максимальный срок',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 10
  },

  {
    code: 'minAmount',
    type: EInputType.Number,
    placeholder: 'Минимальная сумма',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 100
  },
  {
    code: 'maxAmount',
    type: EInputType.Number,
    placeholder: 'Максимальная сумма',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 100
  },
  {
    code: 'rateBasic',
    type: EInputType.Number,
    placeholder: 'Годовая ставка',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 10
  },
  {
    code: 'commissionMonthly',
    type: EInputType.Number,
    placeholder: 'Ежемесячная комиссия',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 100
  },




  {
    code: 'gracePeriodRate',
    type: EInputType.Number,
    placeholder: 'Срок льготного периода (0% год ставка)',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 100
  },
  {
    code: 'gracePeriodCommission',
    type: EInputType.Number,
    placeholder: 'Срок льготного периода (0% ежем комисссия)',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 100
  } ,{
    code: 'gracePeriodPayment',
    type: EInputType.Number,
    placeholder: 'Срок льготного периода (0 платеж основного долга)',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 100
  },
  {
    code: 'pattern', /// ???????
    type: EInputType.Number,
    placeholder: 'Шаблон',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 100
  },
  {
    code: 'rateDiscount',
    type: EInputType.Number,
    placeholder: 'Размер дисконта',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 10
  },

  {
    code: 'comment', /// ???????
    type: EInputType.Text,
    placeholder: 'Комментарии',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 100
  },

  {
    code: 'dirGoodsGroups',
    type: EInputType.ListForSelect,
    selectEmittedValueType: ValueType.Object,
    propertyName: 'nameAm',
    placeholder: 'Группы товаров',
    optionsListName: 'goodsGroup',
    required: true,
    disabled: false,
    readonly: false,
  },
];
