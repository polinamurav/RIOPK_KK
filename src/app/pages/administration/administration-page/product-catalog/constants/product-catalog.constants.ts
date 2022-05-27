import { EInputType, TableDataHeader, ValueType } from '@app/_models';
import { AdmBaseModalFormField } from '@app/shared/modals/administration-base-modal/constants/administration-base-modal.constants';

export const PRODUCT_CATALOG_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'TableHeader.ProductName', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameGe', 'TableHeader.ProductName', 'ge', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'TableHeader.ProductName', 'en', 'product.nameRu'),
  new TableDataHeader('product.code', 'TableHeader.Code', 'string', 'product.code'),
  new TableDataHeader('tariff.id', 'TableHeader.Tariff', 'string', 'tariff'),
  new TableDataHeader('currency.id', 'TableHeader.Currency', 'string', 'currency'),
  new TableDataHeader('minPeriod', 'TableHeader.MinTerm', 'string', 'minPeriod'),
  new TableDataHeader('maxPeriod', 'TableHeader.MaxTerm', 'string', 'maxPeriod'),
  new TableDataHeader('minSum', 'TableHeader.MinSum', 'string', 'minSum'),
  new TableDataHeader('maxSum', 'TableHeader.MaxSum', 'string', 'maxSum'),
  new TableDataHeader('interestRateFrom', 'TableHeader.MinRate', 'string', 'interestRateFrom'),
  new TableDataHeader('interestRateTo', 'TableHeader.MaxRate', 'string', 'interestRateTo'),
  new TableDataHeader('adminFeeRate', 'TableHeader.Commission', 'string', 'adminFeeRate'),
  new TableDataHeader('fee1Min', 'TableHeader.CommissionInLari', 'string', 'fee1Min'),
  new TableDataHeader('gracePeriod', 'TableHeader.GracePeriod', 'string', 'gracePeriod'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader(
    'prepaymentRate',
    'TableHeader.CommissionForPrepayment',
    'string',
    'prepaymentRate'
  ),
  new TableDataHeader('overpayPrepaymentRate', 'TableHeader.EarlyRepaymentFee', 'string', 'overpayPrepaymentRate'),
  new TableDataHeader(
    'paymentInOtherBankRate',
    'TableHeader.CommissionForRefinancingFromAnotherBank',
    'string',
    'paymentInOtherBankRate'
  ),
  new TableDataHeader('absPenaltySchema', 'TableHeader.PenaltyScheme', 'string', 'absPenaltySchema'),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active')
];

export const PRODUCT_CATALOG_FORM: AdmBaseModalFormField[] = [
  {
    code: 'productId',
    type: EInputType.CustomSelect,
    placeholder: 'Modals.Placeholder.ProductName',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'product',
    customListValueName: 'id',
    class: 'full-row'
  },
  {
    code: 'currency',
    type: EInputType.Select,
    placeholder: 'Modals.Placeholder.Currency',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'currencies',
    propertyName: 'id',
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'tariff',
    type: EInputType.Select,
    placeholder: 'Modals.Placeholder.Tariff',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'tariff',
    propertyName: 'id',
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'minPeriod',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.MinTerm',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'maxPeriod',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.MaxTerm',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'minSum',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.MinSum',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'maxSum',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.MaxSum',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'interestRateFrom',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.MinRate',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'interestRateTo',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.MaxRate',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'adminFeeRate',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.Commission',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'fee1Min',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.CommissionInLari',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'gracePeriod',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.GracePeriod',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'prepaymentRate',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.CommissionForPrepayment',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'overpayPrepaymentRate',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.EarlyRepaymentFee',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'paymentInOtherBankRate',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.CommissionForRefinancingFromAnotherBank',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'absPenaltySchema',
    type: EInputType.Number,
    placeholder: 'Modals.Placeholder.PenaltyScheme',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Modals.Placeholder.Active',
    required: true,
    disabled: false,
    readonly: false
  }
];
