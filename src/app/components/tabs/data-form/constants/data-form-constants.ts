import { EditableTableHeader, OptionListNames, RoleAuthority, TableDataHeader } from '@app/_models';

export interface RefLiabilityKey {
  key: string;
  keyWithId: string;
}

export const REF_LIABILITY_KEYS: RefLiabilityKey[] = [
  { key: 'ref1AcbLiability', keyWithId: 'ref1AcbLiabilityId' },
  { key: 'ref2AcbLiability', keyWithId: 'ref2AcbLiabilityId' },
  { key: 'ref3AcbLiability', keyWithId: 'ref3AcbLiabilityId' },
  { key: 'ref4AcbLiability', keyWithId: 'ref4AcbLiabilityId' },
  { key: 'ref5AcbLiability', keyWithId: 'ref5AcbLiabilityId' },
  { key: 'ref6AcbLiability', keyWithId: 'ref6AcbLiabilityId' },
  { key: 'ref7AcbLiability', keyWithId: 'ref7AcbLiabilityId' },
  { key: 'ref8AcbLiability', keyWithId: 'ref8AcbLiabilityId' },
  { key: 'ref9AcbLiability', keyWithId: 'ref9AcbLiabilityId' },
  { key: 'ref10AcbLiability', keyWithId: 'ref10AcbLiabilityId' }
];

export const POSSIBLE_CREDIT_PROPS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameGe', 'FullForm.TableHeaders.Product', 'ge', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('creditSum', 'FullForm.TableHeaders.LoanAmount', 'number', 'creditSum'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('annPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'annPayment'),
  new TableDataHeader('creditTerm', 'FullForm.TableHeaders.Term', 'wholeNumber', 'creditTerm'),
  new TableDataHeader('issueFee', 'FullForm.TableHeaders.IssuanceFee', 'string'),
  new TableDataHeader('restructureFee', 'FullForm.TableHeaders.RestructuringFee', 'string'),
  new TableDataHeader('prepaymentRate', 'FullForm.TableHeaders.PrepaymentCommission', 'string'),
  new TableDataHeader('overpayPrepaymentRate', 'FullForm.TableHeaders.EarlyRepaymentFee', 'string'),
  new TableDataHeader('paymentInOtherBankRate', 'FullForm.TableHeaders.RefinancingFeeAnotherBank', 'string'),
  new TableDataHeader('gracePeriod', 'FullForm.TableHeaders.GracePeriod', 'string'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('choose', 'Buttons.Choose', 'button')
];

export const POSSIBLE_CREDIT_PROPS_WITH_REF: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameGe', 'FullForm.TableHeaders.Product', 'ge', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('creditSum', 'FullForm.TableHeaders.LoanAmount', 'number', 'creditSum'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('annPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'annPayment'),
  new TableDataHeader('creditTerm', 'FullForm.TableHeaders.Term', 'wholeNumber', 'creditTerm'),
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
  new TableDataHeader('gracePeriod', 'FullForm.TableHeaders.GracePeriod', 'string'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('choose', 'Buttons.Choose', 'button')
];

export const PRODUCT_NAME_PROPS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameGe', 'FullForm.TableHeaders.Product', 'ge', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('creditSum', 'FullForm.TableHeaders.LoanAmount', 'number', 'creditSum'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('freshMoney', 'FullForm.TableHeaders.FreshMoney', 'number', 'freshMoney'),
  new TableDataHeader('annPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'annPayment'),
  new TableDataHeader('creditTerm', 'FullForm.TableHeaders.Term', 'wholeNumber', 'creditTerm'),
  new TableDataHeader('issueFee', 'FullForm.TableHeaders.IssuanceFee', 'string'),
  new TableDataHeader('restructureFee', 'FullForm.TableHeaders.RestructuringFee', 'string'),
  new TableDataHeader('prepaymentRate', 'FullForm.TableHeaders.PrepaymentCommission', 'string'),
  new TableDataHeader('overpayPrepaymentRate', 'FullForm.TableHeaders.EarlyRepaymentFee', 'string'),
  new TableDataHeader('paymentInOtherBankRate', 'FullForm.TableHeaders.RefinancingFeeAnotherBank', 'string'),
  new TableDataHeader('gracePeriod', 'FullForm.TableHeaders.GracePeriod', 'string'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('refinanceLiabilities', 'FullForm.TableHeaders.RefLoans', 'string')
];

export const CREDIT_INFO_NAME_PROPS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameGe', 'FullForm.TableHeaders.Product', 'ge', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('creditAmount', 'FullForm.TableHeaders.LoanAmount', 'number', 'creditAmount'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('freshMoney', 'FullForm.TableHeaders.FreshMoney', 'number', 'freshMoney'),
  new TableDataHeader('monthlyPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'monthlyPayment'),
  new TableDataHeader('creditTerm', 'FullForm.TableHeaders.Term', 'wholeNumber', 'creditTerm'),
  new TableDataHeader('issueFee', 'FullForm.TableHeaders.IssuanceFee', 'string'),
  new TableDataHeader('restructureFee', 'FullForm.TableHeaders.RestructuringFee', 'string'),
  new TableDataHeader('prepaymentRate', 'FullForm.TableHeaders.PrepaymentCommission', 'string'),
  new TableDataHeader('overpayPrepaymentRate', 'FullForm.TableHeaders.EarlyRepaymentFee', 'string'),
  new TableDataHeader('paymentInOtherBankRate', 'FullForm.TableHeaders.RefinancingFeeAnotherBank', 'string'),
  new TableDataHeader('gracePeriod', 'FullForm.TableHeaders.GracePeriod', 'string'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('refinanceLiabilities', 'FullForm.TableHeaders.RefLoans', 'string')
];

export const REFINANCE_PROPS: TableDataHeader[] = [
  new TableDataHeader('contractCode', 'FullForm.TableHeaders.LoanAgreement', 'string'),
  new TableDataHeader('startDate', 'FullForm.TableHeaders.AgreementDate', 'date'),
  new TableDataHeader('outstandingAmount', 'FullForm.TableHeaders.RefinancingAmount', 'number'),
  new TableDataHeader('totalCreditAmountCurrency', 'FullForm.TableHeaders.Currency', 'string'),
  new TableDataHeader('contractIdentifier', 'FullForm.TableHeaders.ContractIdentifier', 'string'),
  new TableDataHeader('selected', 'Buttons.Choose', 'toggle')
];

export const APPLICANT_INCOME_TABLE_HEADERS: EditableTableHeader[] = [
  {
    code: 'companyId',
    value: 'FullForm.TableHeaders.CompanyCode',
    type: 'paginationSelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.Companies,
    selectSearchCodeName: 'company',
    selectPropertyName: 'id'
  },
  {
    code: 'companyId',
    value: 'FullForm.TableHeaders.CompanyName',
    type: 'paginationSelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.Companies,
    selectSearchCodeName: 'company',
    selectPropertyName: 'name'
  },
  // {
  //   code: 'companyCategory',
  //   value: 'FullForm.TableHeaders.CompanyCategory',
  //   type: 'string',
  //   isRequired: true,
  //   size: 'small'
  // },
  {
    code: 'dirCompanyActivityTypeId',
    value: 'FullForm.TableHeaders.CompanyActivityType',
    type: 'lazySelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.CompanyActivityType
  },
  {
    code: 'isSalaryProject',
    value: 'FullForm.TableHeaders.SalaryProject',
    type: 'toggle',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'isBasic',
    value: 'FullForm.TableHeaders.BasicCompany',
    type: 'toggleDependent',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'jobPosition',
    value: 'FullForm.TableHeaders.JobPosition',
    type: 'string',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'dirJobPositionId',
    value: 'FullForm.TableHeaders.JobPositionType',
    type: 'lazySelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.JobPositionType
  },
  {
    code: 'jobExp',
    value: 'FullForm.TableHeaders.JobExperience',
    type: 'string',
    isRequired: true,
    size: 'small',
    visibleForRolesList: [RoleAuthority.DECISION_MAKER, RoleAuthority.VERIFIER]
  },
  {
    code: 'amount',
    value: 'FullForm.TableHeaders.Income',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'dirCurrencyId',
    value: 'FullForm.TableHeaders.Currency',
    type: 'lazySelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.Currencies,
    selectPropertyName: 'id'
  },
  {
    code: 'dirIncomeTypeId',
    value: 'FullForm.TableHeaders.IncomeType',
    type: 'lazySelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.IncomeType
  },
  {
    code: 'monthCnt',
    value: 'FullForm.TableHeaders.AmountPerMonth',
    type: 'string',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'dirIncomeFrequencyId',
    value: 'FullForm.TableHeaders.IncomeFrequency',
    type: 'lazySelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.IncomeFrequency
  },
  {
    code: 'isIncomeUsed',
    value: 'FullForm.TableHeaders.IncomeUsed',
    type: 'toggle',
    isRequired: false,
    size: 'small'
  }
];

export const APPLICANT_LOAN_TABLE_HEADERS: EditableTableHeader[] = [
  {
    code: 'contractCode',
    value: 'FullForm.TableHeaders.ContractCode',
    type: 'string',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'dirBankId',
    value: 'FullForm.TableHeaders.BankName',
    type: 'lazySelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.Banks
  },
  {
    code: 'initialAmount',
    value: 'FullForm.TableHeaders.InitialLoanAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'dirCurrencyId',
    value: 'FullForm.TableHeaders.Currency',
    type: 'lazySelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.Currencies,
    selectPropertyName: 'id'
  },
  /*{
    code: 'rate',
    value: 'FullForm.TableHeaders.InterestRate',
    type: 'string',
    isRequired: true,
    pattern: /^[0-9]\d*$/,
    size: 'small'
  },*/
  {
    code: 'beginDate',
    value: 'FullForm.TableHeaders.BeginDate',
    type: 'Date',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'endDate',
    value: 'FullForm.TableHeaders.EndDate',
    type: 'Date',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'outstandingAmount',
    value: 'FullForm.TableHeaders.OutstandingAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'monthlyPayment',
    value: 'FullForm.TableHeaders.Payment',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'overdueAmount',
    value: 'FullForm.TableHeaders.OverdueAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'contractIdentifier',
    value: 'FullForm.TableHeaders.ContractIdentifier',
    type: 'string',
    isRequired: true,
    size: 'small'
  }
];

export const APPLICANT_GUARANTOR_TABLE_HEADERS: EditableTableHeader[] = [
  {
    code: 'contractCode',
    value: 'FullForm.TableHeaders.ContractCode',
    type: 'string',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'dirBankId',
    value: 'FullForm.TableHeaders.BankName',
    type: 'lazySelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.Banks
  },
  {
    code: 'borrowerFirstName',
    value: 'FullForm.TableHeaders.BorrowerFirstName',
    type: 'string',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'borrowerLastName',
    value: 'FullForm.TableHeaders.BorrowerLastName',
    type: 'string',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'initialAmount',
    value: 'FullForm.TableHeaders.InitialLoanAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'dirCurrencyId',
    value: 'FullForm.TableHeaders.Currency',
    type: 'lazySelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.Currencies,
    selectPropertyName: 'id'
  },
  /*{
    code: 'rate',
    value: 'FullForm.TableHeaders.InterestRate',
    type: 'string',
    isRequired: true,
    pattern: /^[0-9]\d*$/,
    size: 'small'
  },*/
  {
    code: 'beginDate',
    value: 'FullForm.TableHeaders.BeginDate',
    type: 'Date',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'endDate',
    value: 'FullForm.TableHeaders.EndDate',
    type: 'Date',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'outstandingAmount',
    value: 'FullForm.TableHeaders.OutstandingAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'monthlyPayment',
    value: 'FullForm.TableHeaders.Payment',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'overdueAmount',
    value: 'FullForm.TableHeaders.OverdueAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'guarantorCnt',
    value: 'FullForm.TableHeaders.Guarantors',
    type: 'string',
    isRequired: true,
    pattern: /^[0-9]\d*$/,
    size: 'small'
  },
  {
    code: 'contractIdentifier',
    value: 'FullForm.TableHeaders.ContractIdentifier',
    type: 'string',
    isRequired: true,
    size: 'small'
  }
];
