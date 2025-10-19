import {
  BaseFormField,
  Dir,
  EditableTableHeader,
  EInputType,
  OptionListNames,
  RoleAuthority,
  TableDataHeader,
  ValueType
} from '@app/_models';

// * Основные условия финансирования
export const BASIC_CONDITIONS_FINANCING_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'DecisionMaking.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'DecisionMaking.TableHeaders.Product', 'am', 'product.nameAm'),
  new TableDataHeader('creditAmount', 'DecisionMaking.TableHeaders.LoanAmount', 'string', 'creditAmount'),
  new TableDataHeader('dirCurrency.id', 'DecisionMaking.TableHeaders.LoanCurrency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'DecisionMaking.TableHeaders.Rate', 'string', 'rate'),

  new TableDataHeader('monthlyPayment', 'DecisionMaking.TableHeaders.Payment', 'string', 'monthlyPayment'),

  new TableDataHeader('creditTermWithType', 'DecisionMaking.TableHeaders.CreditTerm', 'ru', 'creditTermWithType'),
  new TableDataHeader('creditTermWithTypeAm', 'DecisionMaking.TableHeaders.CreditTerm', 'am', 'creditTermWithTypeAm'),
  // new TableDataHeader(
  //   'singleFeeLoanIssueSum',
  //   'DecisionMaking.TableHeaders.Commission',
  //   'string',
  //   'singleFeeLoanIssueSum'
  // ),
  // new TableDataHeader(
  //   'monthlyFeeLoanAccSum',
  //   'DecisionMaking.TableHeaders.CommissionAmount',
  //   'string',
  //   'monthlyFeeLoanAccSum'
  // ),
  // new TableDataHeader(
  //   'monthlyFeeLoanAccAddSum',
  //   'DecisionMaking.TableHeaders.MonthlyFeeLoanAcc',
  //   'string',
  //   'monthlyFeeLoanAccAddSum'
  // ),
  new TableDataHeader('effectiveRate', 'DecisionMaking.TableHeaders.EffectiveRate', 'string', 'effectiveRate'),
  new TableDataHeader(
    'dirScheduleType.nameRu',
    'DecisionMaking.TableHeaders.RepaymentSchedule',
    'ru',
    'dirScheduleType.nameRu'
  ),
  new TableDataHeader(
    'dirScheduleType.nameAm',
    'DecisionMaking.TableHeaders.RepaymentSchedule',
    'am',
    'dirScheduleType.nameAm'
  ),
  new TableDataHeader(
    'multiplicityOfIncome',
    'DecisionMaking.TableHeaders.MultiplicityOfIncome',
    'string',
    'multiplicityOfIncome'
  ),
  new TableDataHeader(
    'contributionDifference',
    'DecisionMaking.TableHeaders.ContributionDifference',
    'string',
    'contributionDifference'
  )
];

// * пересчитаные условия финансирования
export const RECALCULATE_CONDITIONS_FINANCING_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'DecisionMaking.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'DecisionMaking.TableHeaders.Product', 'am', 'product.nameAm'),
  new TableDataHeader('maxLimit', 'DecisionMaking.TableHeaders.LoanAmount', 'string', 'maxLimit'),
  new TableDataHeader('dirCurrency.id', 'DecisionMaking.TableHeaders.LoanCurrency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'DecisionMaking.TableHeaders.Rate', 'string', 'rate'),
  new TableDataHeader('monthlyPayment', 'DecisionMaking.TableHeaders.Payment', 'number', 'monthlyPayment'),
  new TableDataHeader('creditTermWithType', 'DecisionMaking.TableHeaders.CreditTerm', 'ru', 'creditTermWithType'),
  new TableDataHeader('creditTermWithTypeAm', 'DecisionMaking.TableHeaders.CreditTerm', 'am', 'creditTermWithType'),

  // new TableDataHeader(
  //   'singleFeeLoanIssueSum',
  //   'DecisionMaking.TableHeaders.Commission',
  //   'string',
  //   'singleFeeLoanIssueSum'
  // ),
  // new TableDataHeader(
  //   'monthlyFeeLoanAccSum',
  //   'DecisionMaking.TableHeaders.CommissionAmount',
  //   'string',
  //   'monthlyFeeLoanAccSum'
  // ),
  // new TableDataHeader(
  //   'monthlyFeeLoanAccAddSum',
  //   'DecisionMaking.TableHeaders.MonthlyFeeLoanAcc',
  //   'string',
  //   'monthlyFeeLoanAccAddSum'
  // ),
  new TableDataHeader('effectiveRate', 'DecisionMaking.TableHeaders.EffectiveRate', 'string', 'effectiveRate')
];

export const LOAN_TOTAL_INFO: BaseFormField[] = [
  {
    code: 'amount',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.Amount',
    required: false,
    disabled: true,
    readonly: true,
    class: 'col-3'
  },
  {
    code: 'remainder',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.Remainder',
    required: false,
    disabled: true,
    readonly: true,
    class: 'col-3'
  },
  {
    code: 'monthlyLoanPayment',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.MonthlyLoanPayment',
    required: false,
    disabled: true,
    readonly: true,
    class: 'col-3'
  }
];

// * Отлагательные условия
export const SUSPENSIVE_CONDITIONS_HEADERS: EditableTableHeader[] = [
  {
    code: 'creditorOrganization',
    value: 'DecisionMaking.TableHeaders.BankName', //  Банк-кредитор
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'medium',
    setSortIf: col => true,
    setFilterIf: col => true
  },
  {
    code: 'contractCode',
    value: 'DecisionMaking.TableHeaders.ContractCode', // Код договора
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setSortIf: col => true
  },
  {
    code: 'amount',
    value: 'DecisionMaking.TableHeaders.Amount', // сумма
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setSortIf: col => true
  },
  {
    code: 'dirCurrencyId',
    value: 'DecisionMaking.TableHeaders.Currency', // Валюта
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setSortIf: col => true,
    setFilterIf: col => true
  },
  {
    code: 'remainder',
    value: 'DecisionMaking.TableHeaders.OutstandingAmount', // Остаток
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setSortIf: col => true
  },
  {
    code: 'interestRates',
    value: 'DecisionMaking.TableHeaders.Percent', // %
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setSortIf: col => true
  },
  {
    code: 'issueDate',
    value: 'DecisionMaking.TableHeaders.AgreementDate', // Дата договора
    type: 'Date',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setSortIf: col => true
  },
  {
    code: 'maturityDate',
    value: 'DecisionMaking.TableHeaders.RedemptionDate', // Дата погашения
    type: 'Date',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setSortIf: col => true
  },
  {
    code: 'typeOfLoan',
    value: 'DecisionMaking.TableHeaders.TypeOfLoan', // Вид кредита
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setSortIf: col => true,
    setFilterIf: col => true
  },
  {
    code: 'deposit',
    value: 'DecisionMaking.TableHeaders.Deposit', // Залог
    type: 'Text',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setSortIf: col => true
  },
  {
    code: 'monthlyLoanPayment',
    value: 'DecisionMaking.TableHeaders.MonthlyPayment', // Ежемесячный взнос
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setSortIf: col => true
  },

  {
    code: 'suspensiveConditionsType',
    value: 'FullForm.TableHeaders.SuspensiveConditionsType', // ( тип отлогательные услови )
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small',
    setFilterIf: col => true
  },
  {
    code: 'acceptedTermsRM',
    value: 'DecisionMaking.TableHeaders.AcceptedConditionRM',
    type: 'toggle',
    isRequired: true,
    size: 'small',
    setFilterIf: col => true,
    isBooleanFilter: true
  }
];

export const INCOME_INFORMATION_HEADERS: EditableTableHeader[] = [
  {
    code: 'companyId',
    value: 'DecisionMaking.TableHeaders.CompanyCode',
    type: 'paginationSelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.Companies,
    selectSearchCodeName: 'company',
    selectPropertyName: 'id'
  },
  {
    code: 'companyId',
    value: 'DecisionMaking.TableHeaders.CompanyName',
    type: 'paginationSelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.Companies,
    selectSearchCodeName: 'company',
    selectPropertyName: 'name'
  },
  {
    code: 'dirCompanyActivityTypeId',
    value: 'DecisionMaking.TableHeaders.CompanyActivities',
    type: 'lazySelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.CompanyActivityType
  },
  {
    code: 'isSalaryProject',
    value: 'DecisionMaking.TableHeaders.SalaryProject',
    type: 'toggle',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'isBasic',
    value: 'DecisionMaking.TableHeaders.BasicOrganization',
    type: 'toggleDependent',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'jobPosition',
    value: 'DecisionMaking.TableHeaders.Position',
    type: 'string',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'dirJobPositionId',
    value: 'DecisionMaking.TableHeaders.PositionType',
    type: 'lazySelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.JobPositionType
  },
  {
    code: 'jobExp',
    value: 'DecisionMaking.TableHeaders.WorkExperience',
    type: 'string',
    isRequired: true,
    size: 'small',
    defaultNewValue: '36',
    visibleForRolesList: [RoleAuthority.DECISION_MAKER, RoleAuthority.VERIFIER]
  },
  {
    code: 'amount',
    value: 'DecisionMaking.TableHeaders.Income',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'dirCurrencyId',
    value: 'DecisionMaking.TableHeaders.Currency',
    type: 'lazySelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.Currencies,
    selectPropertyName: 'id'
  },
  {
    code: 'dirIncomeTypeId',
    value: 'DecisionMaking.TableHeaders.IncomeType',
    type: 'lazySelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.IncomeType
  },
  {
    code: 'monthCnt',
    value: 'DecisionMaking.TableHeaders.NumberOfDepositsPerMonth',
    type: 'string',
    isRequired: true,
    size: 'small',
    pattern: /^[0-9]\d*$/
  },
  {
    code: 'dirIncomeFrequencyId',
    value: 'DecisionMaking.TableHeaders.FrequencyOfIncomeGeneration',
    type: 'lazySelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.IncomeFrequency
  },
  {
    code: 'isIncomeUsed',
    value: 'DecisionMaking.TableHeaders.TakeIntoAccountIncome',
    type: 'toggle',
    isRequired: false,
    size: 'small'
  }
];

export const LOAN_HEADERS: EditableTableHeader[] = [
  {
    code: 'contractCode',
    value: 'DecisionMaking.TableHeaders.ContractCode',
    type: 'string',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'dirBankId',
    value: 'DecisionMaking.TableHeaders.BankName',
    type: 'lazySelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.Banks
  },
  {
    code: 'initialAmount',
    value: 'DecisionMaking.TableHeaders.InitialLoanAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'dirCurrencyId',
    value: 'DecisionMaking.TableHeaders.Currency',
    type: 'lazySelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.Currencies,
    selectPropertyName: 'id'
  },
  /*{
    code: 'rate',
    value: 'DecisionMaking.TableHeaders.Rate',
    type: 'string',
    isRequired: true,
    pattern: /^[0-9]\d*$/,
    size: 'small'
  },*/
  {
    code: 'beginDate',
    value: 'DecisionMaking.TableHeaders.BeginDate',
    type: 'Date',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'endDate',
    value: 'DecisionMaking.TableHeaders.EndDate',
    type: 'Date',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'outstandingAmount',
    value: 'DecisionMaking.TableHeaders.OutstandingAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'monthlyPayment',
    value: 'DecisionMaking.TableHeaders.MonthlyPayment',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'overdueAmount',
    value: 'DecisionMaking.TableHeaders.OverdueAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'contractIdentifier',
    value: 'DecisionMaking.TableHeaders.ContractIdentifier',
    type: 'string',
    isRequired: true,
    size: 'small'
  }
];

export const GUARANTOR_TABLE_HEADERS: EditableTableHeader[] = [
  {
    code: 'contractCode',
    value: 'DecisionMaking.TableHeaders.ContractCode',
    type: 'string',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'dirBankId',
    value: 'DecisionMaking.TableHeaders.BankName',
    type: 'lazySelect',
    isRequired: true,
    size: 'medium',
    selectDataName: OptionListNames.Banks
  },
  {
    code: 'borrowerFirstName',
    value: 'DecisionMaking.TableHeaders.BorrowerFirstName',
    type: 'string',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'borrowerLastName',
    value: 'DecisionMaking.TableHeaders.BorrowerLastName',
    type: 'string',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'initialAmount',
    value: 'DecisionMaking.TableHeaders.InitialLoanAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'dirCurrencyId',
    value: 'DecisionMaking.TableHeaders.Currency',
    type: 'lazySelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.Currencies,
    selectPropertyName: 'id'
  },
  {
    code: 'beginDate',
    value: 'DecisionMaking.TableHeaders.BeginDate',
    type: 'Date',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'endDate',
    value: 'DecisionMaking.TableHeaders.EndDate',
    type: 'Date',
    isRequired: true,
    size: 'small'
  },
  {
    code: 'outstandingAmount',
    value: 'DecisionMaking.TableHeaders.OutstandingAmount',
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'monthlyPayment',
    value: 'DecisionMaking.TableHeaders.MonthlyPayment',
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
    value: 'DecisionMaking.TableHeaders.Guarantors',
    type: 'string',
    isRequired: true,
    pattern: /^[0-9]\d*$/,
    size: 'small'
  },
  {
    code: 'contractIdentifier',
    value: 'DecisionMaking.TableHeaders.ContractIdentifier',
    type: 'string',
    isRequired: true,
    size: 'small'
  }
];

export const PREAPPROVED_LOAN_TERMS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'DecisionMaking.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'DecisionMaking.TableHeaders.Product', 'am', 'product.nameRu'),
  new TableDataHeader('creditAmount', 'DecisionMaking.TableHeaders.LoanAmount', 'number', 'creditSum'),
  new TableDataHeader('dirCurrency.id', 'DecisionMaking.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'DecisionMaking.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('freshMoney', 'DecisionMaking.TableHeaders.AmountOnHand', 'number', 'freshMoney'),
  new TableDataHeader('monthlyPayment', 'DecisionMaking.TableHeaders.Payment', 'number', 'monthlyPayment'),
  new TableDataHeader('creditTerm', 'DecisionMaking.TableHeaders.Term', 'wholeNumber', 'creditTerm'),
  new TableDataHeader('issueFee', 'DecisionMaking.TableHeaders.CommissionForTheIssue', 'number', 'issueFee'),
  new TableDataHeader('restructureFee', 'DecisionMaking.TableHeaders.RestructuringFee', 'number', 'restructureFee'),
  new TableDataHeader(
    'prepaymentRate',
    'DecisionMaking.TableHeaders.CommissionForPrepayment',
    'number',
    'prepaymentRate'
  ),
  new TableDataHeader(
    'overpayPrepaymentRate',
    'DecisionMaking.TableHeaders.EarlyRepaymentFee',
    'number',
    'overpayPrepaymentRate'
  ),
  new TableDataHeader(
    'paymentInOtherBankRate',
    'DecisionMaking.TableHeaders.CommissionForRefinancingFromAnotherBank',
    'number',
    'paymentInOtherBankRate'
  ),
  new TableDataHeader('gracePeriod', 'DecisionMaking.TableHeaders.GracePeriod', 'wholeNumber', 'gracePeriod'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('refinanceLiabilities', 'DecisionMaking.TableHeaders.RefLoans', 'string', '')
];

export const CREDIT_CONDITIONS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'DecisionMaking.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'DecisionMaking.TableHeaders.Product', 'am', 'product.nameRu'),
  new TableDataHeader('creditSum', 'DecisionMaking.TableHeaders.LoanAmount', 'number', 'creditSum'),
  new TableDataHeader('dirCurrency.id', 'DecisionMaking.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'DecisionMaking.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('annPayment', 'DecisionMaking.TableHeaders.Payment', 'number', 'annPayment'),
  new TableDataHeader('creditTerm', 'DecisionMaking.TableHeaders.Term', 'wholeNumber', 'creditTerm'),
  new TableDataHeader('issueFee', 'DecisionMaking.TableHeaders.CommissionForTheIssue', 'number', 'issueFee'),
  new TableDataHeader('restructureFee', 'DecisionMaking.TableHeaders.RestructuringFee', 'number', 'restructureFee'),
  new TableDataHeader(
    'prepaymentRate',
    'DecisionMaking.TableHeaders.CommissionForPrepayment',
    'number',
    'prepaymentRate'
  ),
  new TableDataHeader(
    'overpayPrepaymentRate',
    'DecisionMaking.TableHeaders.EarlyRepaymentFee',
    'number',
    'overpayPrepaymentRate'
  ),
  new TableDataHeader(
    'paymentInOtherBankRate',
    'DecisionMaking.TableHeaders.CommissionForRefinancingFromAnotherBank',
    'number',
    'paymentInOtherBankRate'
  ),
  new TableDataHeader('gracePeriod', 'DecisionMaking.TableHeaders.GracePeriod', 'wholeNumber', 'gracePeriod'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string')
];

export const CREDIT_CONDITIONS_WITH_REF_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'DecisionMaking.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'DecisionMaking.TableHeaders.Product', 'am', 'product.nameRu'),
  new TableDataHeader('creditSum', 'DecisionMaking.TableHeaders.LoanAmount', 'number', 'creditSum'),
  new TableDataHeader('dirCurrency.id', 'DecisionMaking.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'DecisionMaking.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('annPayment', 'DecisionMaking.TableHeaders.Payment', 'number', 'annPayment'),
  new TableDataHeader('creditTerm', 'DecisionMaking.TableHeaders.Term', 'wholeNumber', 'creditTerm'),
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
  new TableDataHeader('gracePeriod', 'DecisionMaking.TableHeaders.GracePeriod', 'wholeNumber', 'gracePeriod'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string')
];

export const VERIFICATION_EMPLOYMENTS_HEADERS: EditableTableHeader[] = [
  {
    code: 'company',
    value: 'DecisionMaking.TableHeaders.CompanyCode',
    type: 'paginationSelect',
    isRequired: true,
    isDisabled: true,
    size: 'small',
    selectDataName: OptionListNames.Companies,
    selectSearchCodeName: 'company',
    selectPropertyName: 'id',
    valueType: ValueType.Object
  },
  {
    code: 'company',
    value: 'DecisionMaking.TableHeaders.CompanyName',
    type: 'paginationSelect',
    isRequired: true,
    isDisabled: false,
    size: 'medium',
    selectDataName: OptionListNames.Companies,
    selectSearchCodeName: 'company',
    selectPropertyName: 'name',
    valueType: ValueType.Object
  },
  {
    code: 'initialCompanyStatusId',
    value: 'DecisionMaking.TableHeaders.CurrentStatus',
    type: 'lazySelect',
    isRequired: false,
    isDisabled: true,
    size: 'medium',
    selectDataName: OptionListNames.CompanyStatus
  },
  {
    code: 'companyStatusId',
    value: 'DecisionMaking.TableHeaders.Status',
    type: 'lazySelect',
    isRequired: false,
    size: 'medium',
    selectDataName: OptionListNames.CompanyStatus
  },
  {
    code: 'comment',
    value: 'DecisionMaking.TableHeaders.Comment',
    type: 'string',
    isRequired: false,
    size: 'large'
  }
];

export const TRUE_FALSE_GUIDE: Dir[] = [
  {
    code: '001',
    id: 1,
    nameAm: 'Այո',
    nameEn: 'true',
    nameRu: 'Да',
    active: true,
    changedByUsername: '',
    created: '',
    updated: ''
  },
  {
    code: '002',
    id: 2,
    nameAm: 'Ոչ',
    nameEn: 'false',
    nameRu: 'Нет',
    active: true,
    changedByUsername: '',
    created: '',
    updated: ''
  }
];
