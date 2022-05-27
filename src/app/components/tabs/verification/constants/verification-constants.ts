import {
  BaseFormField,
  EditableTableHeader,
  EInputType,
  OptionListNames,
  TableDataHeader,
} from '@app/_models';

export enum VerificationGroupKeys {
  VerifiedCreditInfo = 'verifiedCreditInfo'
}

export const FINAL_MATRIX_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'Verification.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameGe', 'Verification.TableHeaders.Product', 'ge'),
  new TableDataHeader('product.nameEn', 'Verification.TableHeaders.Product', 'en'),
  new TableDataHeader('creditSum', 'Verification.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'Verification.TableHeaders.Currency', 'string'),
  new TableDataHeader('rate', 'Verification.TableHeaders.Rate', 'number'),
  new TableDataHeader('annPayment', 'Verification.TableHeaders.MonthlyPayment', 'string'),
  new TableDataHeader('creditTerm', 'Verification.TableHeaders.Term', 'string'),
  new TableDataHeader('issueFee', 'Verification.TableHeaders.IssuanceFee', 'string'),
  new TableDataHeader('restructureFee', 'Verification.TableHeaders.RestructuringFee', 'string'),
  new TableDataHeader('prepaymentRate', 'Verification.TableHeaders.PrepaymentCommission', 'string'),
  new TableDataHeader('overpayPrepaymentRate', 'Verification.TableHeaders.EarlyRepaymentFee', 'string'),
  new TableDataHeader('paymentInOtherBankRate', 'Verification.TableHeaders.RefinancingFeeAnotherBank', 'string'),
  new TableDataHeader('gracePeriod', 'Verification.TableHeaders.GracePeriod', 'string'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string')
];

export const FINAL_MATRIX_WITH_REF_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'Verification.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameGe', 'Verification.TableHeaders.Product', 'ge'),
  new TableDataHeader('product.nameEn', 'Verification.TableHeaders.Product', 'en'),
  new TableDataHeader('creditSum', 'Verification.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'Verification.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'Verification.TableHeaders.Rate', 'number'),
  new TableDataHeader('annPayment', 'Verification.TableHeaders.MonthlyPayment', 'number'),
  new TableDataHeader('creditTerm', 'Verification.TableHeaders.Term', 'wholeNumber'),
  new TableDataHeader('ref1AcbLiability.outstandingAmount', 'Credit1', 'number', 'ref1AcbLiability.outstandingAmount'),
  new TableDataHeader(
    'ref1AcbLiability.totalCreditAmountCurrency',
    '',
    'string',
    'ref1AcbLiability.totalCreditAmountCurrency'
  ),
  new TableDataHeader('ref2AcbLiability.outstandingAmount', 'Credit2', 'number', 'ref2AcbLiability.outstandingAmount'),
  new TableDataHeader(
    'ref2AcbLiability.totalCreditAmountCurrency',
    '',
    'string',
    'ref2AcbLiability.totalCreditAmountCurrency'
  ),
  new TableDataHeader('ref3AcbLiability.outstandingAmount', 'Credit3', 'number', 'ref3AcbLiability.outstandingAmount'),
  new TableDataHeader(
    'ref3AcbLiability.totalCreditAmountCurrency',
    '',
    'string',
    'ref3AcbLiability.totalCreditAmountCurrency'
  ),
  new TableDataHeader('ref4AcbLiability.outstandingAmount', 'Credit4', 'number', 'ref4AcbLiability.outstandingAmount'),
  new TableDataHeader(
    'ref4AcbLiability.totalCreditAmountCurrency',
    '',
    'string',
    'ref4AcbLiability.totalCreditAmountCurrency'
  ),
  new TableDataHeader('ref5AcbLiability.outstandingAmount', 'Credit5', 'number', 'ref5AcbLiability.outstandingAmount'),
  new TableDataHeader(
    'ref5AcbLiability.totalCreditAmountCurrency',
    '',
    'string',
    'ref5AcbLiability.totalCreditAmountCurrency'
  ),
  new TableDataHeader('gracePeriod', 'Verification.TableHeaders.GracePeriod', 'wholeNumber'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('refinanceLiabilities', 'Verification.TableHeaders.RefLoans', 'string')
];

export const FINAL_CREDIT_INFO_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'Verification.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameGe', 'Verification.TableHeaders.Product', 'ge'),
  new TableDataHeader('product.nameEn', 'Verification.TableHeaders.Product', 'en'),
  new TableDataHeader('creditAmount', 'Verification.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'Verification.TableHeaders.Currency', 'string'),
  new TableDataHeader('rate', 'Verification.TableHeaders.Rate', 'number'),
  new TableDataHeader('freshMoney', 'Verification.TableHeaders.FreshMoney', 'number'),
  new TableDataHeader('monthlyPayment', 'Verification.TableHeaders.MonthlyPayment', 'string'),
  new TableDataHeader('creditTerm', 'Verification.TableHeaders.Term', 'string'),
  new TableDataHeader('issueFee', 'Verification.TableHeaders.IssuanceFee', 'string'),
  new TableDataHeader('restructureFee', 'Verification.TableHeaders.RestructuringFee', 'string'),
  new TableDataHeader('prepaymentRate', 'Verification.TableHeaders.PrepaymentCommission', 'string'),
  new TableDataHeader('overpayPrepaymentRate', 'Verification.TableHeaders.EarlyRepaymentFee', 'string'),
  new TableDataHeader('paymentInOtherBankRate', 'Verification.TableHeaders.RefinancingFeeAnotherBank', 'string'),
  new TableDataHeader('gracePeriod', 'Verification.TableHeaders.GracePeriod', 'string'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('refinanceLiabilities', 'Verification.TableHeaders.RefLoans', 'string')
];

export const VERIFIED_CREDIT_INFO_HEADERS: EditableTableHeader[] = [
  {
    code: 'product',
    value: 'Verification.TableHeaders.Product',
    type: 'lazySelect',
    isRequired: true,
    isDisabled: true,
    size: 'large',
    selectDataName: OptionListNames.Product,
    isObject: true
  },
  {
    code: 'creditAmount',
    value: 'Verification.TableHeaders.LoanAmount',
    type: 'string',
    isRequired: true,
    size: 'small',
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/
  },
  {
    code: 'dirCurrency',
    value: 'Verification.TableHeaders.Currency',
    type: 'lazySelect',
    isRequired: true,
    isDisabled: true,
    size: 'small',
    selectDataName: OptionListNames.Currencies,
    selectPropertyName: 'id',
    isObject: true
  },
  {
    code: 'rate',
    value: 'Verification.TableHeaders.Rate',
    type: 'string',
    isRequired: true,
    size: 'small',
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/
  },
  {
    code: 'freshMoney',
    value: 'Verification.TableHeaders.FreshMoney',
    type: 'string',
    isRequired: true,
    size: 'small',
    isDisabled: true,
  },
  {
    code: 'monthlyPayment',
    value: 'Verification.TableHeaders.MonthlyPayment',
    type: 'string',
    isRequired: true,
    size: 'small',
    isDisabled: true,
  },
  {
    code: 'creditTerm',
    value: 'Verification.TableHeaders.Term',
    type: 'string',
    isRequired: true,
    size: 'small',
    isDisabled: true,
  },
  {
    code: 'issueFee',
    value: 'Verification.TableHeaders.IssuanceFee',
    type: 'string',
    isRequired: true,
    size: 'small',
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/
  },
  {
    code: 'restructureFee',
    value: 'Verification.TableHeaders.RestructuringFee',
    type: 'string',
    isRequired: true,
    size: 'small',
    isDisabled: true,
  },
  {
    code: 'prepaymentRate',
    value: 'Verification.TableHeaders.PrepaymentCommission',
    type: 'string',
    isRequired: true,
    size: 'small',
    isDisabled: true,
  },
  {
    code: 'overpayPrepaymentRate',
    value: 'Verification.TableHeaders.EarlyRepaymentFee',
    type: 'string',
    isRequired: true,
    size: 'small',
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/
  },
  {
    code: 'paymentInOtherBankRate',
    value: 'Verification.TableHeaders.RefinancingFeeAnotherBank',
    type: 'string',
    isRequired: true,
    size: 'small',
    isDisabled: true,
  },
  {
    code: 'gracePeriod',
    value: 'Verification.TableHeaders.GracePeriod',
    type: 'string',
    isRequired: true,
    size: 'small',
    isDisabled: true,
  },
  {
    code: 'refinanceLiabilities',
    value: 'Verification.TableHeaders.RefLoans',
    type: 'string',
    isRequired: false,
    size: 'small',
    isDisabled: true,
  },
];

export const VERIFICATION_FORM: BaseFormField[] = [
  {
    code: 'productId',
    innerObjectName: 'product',
    objectName: 'requestedCreditInfo',
    type: EInputType.Select,
    placeholder: 'FullForm.Placeholder.ProductType',
    required: true,
    disabled: true,
    readonly: false,
    optionsListName: OptionListNames.Product,
    class: 'col-4'
  },
  {
    code: 'creditAmount',
    objectName: 'requestedCreditInfo',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.LoanAmount',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'creditTerm',
    objectName: 'requestedCreditInfo',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.CreditTerm',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-4'
  }
];
