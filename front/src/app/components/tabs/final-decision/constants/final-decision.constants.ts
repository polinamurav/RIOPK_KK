import { EditableTableHeader, OptionListNames, TableDataHeader } from '@app/_models';
import { bankCodeValidator } from '@app/validators/table-inputs-validators';

// * Предварительно выбранные условия кредитования
export const CHOSEN_CREDIT_INFO_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameAm', 'FinalDecision.TableHeaders.Product', 'am'),
  new TableDataHeader('product.nameEn', 'FinalDecision.TableHeaders.Product', 'en'),
  new TableDataHeader('creditAmount', 'FinalDecision.TableHeaders.LoanAmount', 'number', 'creditAmount'),
  new TableDataHeader('dirCurrency.id', 'FinalDecision.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FinalDecision.TableHeaders.Rate', 'number'),
  new TableDataHeader('monthlyPayment', 'FinalDecision.TableHeaders.MonthlyPayment', 'number'),
  new TableDataHeader('creditTermWithType', 'FinalDecision.TableHeaders.Term', 'ru'),
  new TableDataHeader('creditTermWithTypeAm', 'FinalDecision.TableHeaders.Term', 'am'),
  // new TableDataHeader('singleFeeLoanIssueSum', 'FinalDecision.TableHeaders.IssuanceFee', 'number', 'issueFee'),
  // new TableDataHeader(
  //   'monthlyFeeLoanAccSum',
  //   'FinalDecision.TableHeaders.MounthlyCommission',
  //   'number',
  //   'mounthlyCommission'
  // ), // TODO Romanovski: when api is ready, change this
  // new TableDataHeader('monthlyFeeLoanAccAddSum', 'FullForm.TableHeaders.MounthlyCommissionForService', 'string'),
  new TableDataHeader('effectiveRate', 'FinalDecision.TableHeaders.EffectiveRate', 'number', 'effectiveRate')
];

// * Обязательства
export const APPLICANT_OBLIGATIONS_TABLE_HEADERS: TableDataHeader[] = [
  new TableDataHeader(
    'creditorOrganization',
    'FullForm.TableHeaders.СreditorOrganization', // Организация-кредитор
    'string',
    'creditorOrganization'
  ).setFilter({ filterProperty: 'creditorOrganization' }),
  new TableDataHeader(
    'isCreditLine',
    'FullForm.TableHeaders.CreditLine', // Кредитная линия да/нет
    'string',
    'isCreditLine'
  ).setFilter({ isBoolean: true }),
  new TableDataHeader(
    'isKPZZ',
    'FullForm.TableHeaders.KPZZ', // КПЗЗ да/нет
    'string',
    'isKPZZ'
  ).setFilter({ isBoolean: true }),
  new TableDataHeader(
    'dirLiabilityStatus.nameRu',
    'FullForm.TableHeaders.Status', // Статус
    'ru',
    'dirLiabilityStatus.nameRu'
  ).setFilter({ filterProperty: 'status' }),
  new TableDataHeader(
    'dirLiabilityStatus.nameAm',
    'FullForm.TableHeaders.Status', // Статус
    'am',
    'dirLiabilityStatus.nameAm'
  ).setFilter({ filterProperty: 'status' }),
  new TableDataHeader(
    'amount',
    'FullForm.TableHeaders.Amount', // Первоначальная сумма кредита
    'string',
    'amount'
  ),
  new TableDataHeader(
    'amountActuallyIssued',
    'FullForm.TableHeaders.AmountActuallyIssued', // Сумма по договору
    'string',
    'amountActuallyIssued'
  ),
  new TableDataHeader(
    'dirCurrency.nameRu',
    'FullForm.TableHeaders.LoanCurrency', // Валюта
    'ru',
    'dirCurrency.nameRu'
  ),
  new TableDataHeader(
    'dirCurrency.nameAm',
    'FullForm.TableHeaders.LoanCurrency', // Валюта
    'am',
    'dirCurrency.nameAm'
  ),
  new TableDataHeader(
    'issueDateRemap',
    'FullForm.TableHeaders.IssueDate', // Дата выдачи
    'string',
    'issueDateRemap'
  ),
  new TableDataHeader(
    'maturityDateRemap',
    'FullForm.TableHeaders.PaymentDay', // Дата погашения
    'string',
    'maturityDateRemap'
  ),
  new TableDataHeader(
    'dateOfLastRepaymentRemap',
    'FullForm.TableHeaders.DateOfLastRepayment', // Дата последнего погашения
    'string',
    'dateOfLastRepaymentRemap'
  ),
  new TableDataHeader(
    'remainder',
    'FullForm.TableHeaders.Remainder', // Остаток
    'string',
    'remainder'
  ),
  new TableDataHeader(
    'overdueAmount',
    'FullForm.TableHeaders.OverdueAmountSum', // Просроченная сумма
    'string',
    'overdueAmount'
  ),
  new TableDataHeader(
    'overdueInterest',
    'FullForm.TableHeaders.OverdueInterest', // Просроченный процент
    'string',
    'overdueInterest'
  ),
  new TableDataHeader(
    'interestRates',
    'FullForm.TableHeaders.InterestRates', // Процентная ставка
    'string',
    'interestRates'
  ),
  new TableDataHeader(
    'creditSubclassRemap',
    'FullForm.TableHeaders.CreditSubclass', // Подкласс кредита
    'ru',
    'creditSubclass.absName'
  ),
  new TableDataHeader(
    'creditSubclass.nameAm',
    'FullForm.TableHeaders.CreditSubclass', // Подкласс кредита
    'am',
    'creditSubclass.nameAm'
  ),
  new TableDataHeader(
    'worstRiskClassRemap',
    'FullForm.TableHeaders.WorstRiskClass', // Наихудший класс риска
    'ru',
    'worstRiskClass.absName'
  ),
  new TableDataHeader(
    'worstRiskClass.nameAm',
    'FullForm.TableHeaders.WorstRiskClass', // Наихудший класс риска
    'am',
    'worstRiskClass.nameAm'
  ),
  new TableDataHeader('depositNameRu', 'HistoryResponse.TableHeaders.Deposit', 'ru', 'depositNameRu'), // Залог
  new TableDataHeader('depositNameAm', 'HistoryResponse.TableHeaders.Deposit', 'am', 'depositNameAm'), // Залог
  new TableDataHeader(
    'typeOfLoanRemap.nameAm',
    'FullForm.TableHeaders.TypeOfLoan', // Вид кредита
    'am',
    'typeOfLoanRemap.nameAm'
  ).setFilter({ filterProperty: 'typeOfLoan' }),
  new TableDataHeader(
    'typeOfLoanRemap.nameRu',
    'FullForm.TableHeaders.TypeOfLoan', // Вид кредита
    'ru',
    'typeOfLoanRemap.nameRu'
  ).setFilter({ filterProperty: 'typeOfLoan' }),
  new TableDataHeader(
    'monthlyLoanPayment',
    'FullForm.TableHeaders.MonthlyLoanPayment', // Ежемесячный взнос по кредиту
    'string',
    'monthlyLoanPayment'
  )
];

// * Утвержденные условия кредитования
export const POSSIBLE_CREDIT_PROPS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'FinalDecision.TableHeaders.Product', 'am', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'FinalDecision.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('maxLimit', 'FinalDecision.TableHeaders.LoanAmount', 'number', 'maxLimit'),
  new TableDataHeader('dirCurrency.id', 'FinalDecision.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FinalDecision.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('maxAnnPayment', 'FinalDecision.TableHeaders.MonthlyPayment', 'number', 'annPayment'),
  // new TableDataHeader('creditTermWithType', 'FinalDecision.TableHeaders.Term', 'string', 'creditTermWithType'),
  // new TableDataHeader('singleFeeLoanIssueSum', 'FinalDecision.TableHeaders.IssuanceFee', 'string'),
  // new TableDataHeader('monthlyFeeLoanAccSum', 'FinalDecision.TableHeaders.MounthlyCommission', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  new TableDataHeader('effectiveRate', 'FinalDecision.TableHeaders.EffectiveRate', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  new TableDataHeader('choose', 'Buttons.Choose', 'button')
];

// * Рассчитанные условия кредитования
export const CALCULATED_CREDIT_CONDITIONS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameAm', 'FinalDecision.TableHeaders.Product', 'am'),
  new TableDataHeader('product.nameEn', 'FinalDecision.TableHeaders.Product', 'en'),
  new TableDataHeader('maxLimit', 'FinalDecision.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'FinalDecision.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FinalDecision.TableHeaders.Rate', 'number'),
  new TableDataHeader('annPayment', 'FinalDecision.TableHeaders.MonthlyPayment', 'number'),
  new TableDataHeader('creditTermWithType', 'FinalDecision.TableHeaders.Term', 'string'),
  new TableDataHeader('issueFee', 'FinalDecision.TableHeaders.IssuanceFee', 'number', 'issueFee'),
  new TableDataHeader(
    'mounthlyCommission',
    'FinalDecision.TableHeaders.MounthlyCommission',
    'number',
    'mounthlyCommission'
  ), // TODO Romanovski: when api is ready, change this
  new TableDataHeader('effectiveRate', 'FinalDecision.TableHeaders.EffectiveRate', 'number', 'effectiveRate') // TODO Romanovski: when api is ready, change this
];

// * Выбранные условия кредитования
export const APPROVED_CREDIT_CONDITIONS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameAm', 'FinalDecision.TableHeaders.Product', 'am'),
  new TableDataHeader('product.nameEn', 'FinalDecision.TableHeaders.Product', 'en'),
  new TableDataHeader('maxLimit', 'FinalDecision.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'FinalDecision.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FinalDecision.TableHeaders.Rate', 'number'),
  new TableDataHeader('maxAnnPayment', 'FinalDecision.TableHeaders.MonthlyPayment', 'number'),
  new TableDataHeader('creditTerm', 'FinalDecision.TableHeaders.Term', 'wholeNumber'),
  new TableDataHeader('singleFeeLoanIssueSum', 'FinalDecision.TableHeaders.IssuanceFee', 'number', 'issueFee'),
  new TableDataHeader(
    'monthlyFeeLoanAccSum',
    'FinalDecision.TableHeaders.MounthlyCommission',
    'number',
    'monthlyFeeLoanAccSum'
  ), // TODO Romanovski: when api is ready, change this
  new TableDataHeader('effectiveRate', 'FinalDecision.TableHeaders.EffectiveRate', 'number', 'effectiveRate') // TODO Romanovski: when api is ready, change this
];

// * Отлагательные условия
export const SUSPENSIVE_CONDITIONS_TABLE_HEADERS: EditableTableHeader[] = [
  {
    code: 'creditorOrganization',
    value: 'FinalDecision.TableHeaders.BankName', // Банк-кредитор
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'medium'
  },
  {
    code: 'contractCode',
    value: 'FinalDecision.TableHeaders.ContractCode', // Код договора
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small'
  },
  {
    code: 'amount',
    value: 'FinalDecision.TableHeaders.InitialLoanAmount', // Первоначальная сумма кредита
    type: 'string',
    isRequired: false,
    isDisabled: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'dirCurrency',
    value: 'FinalDecision.TableHeaders.CurrencyAmount', // Валюта кредита
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small'
  },
  {
    code: 'remainder',
    value: 'FinalDecision.TableHeaders.OutstandingAmount', // Остаток кредита
    type: 'string',
    isRequired: false,
    isDisabled: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'interestRates',
    value: 'FinalDecision.TableHeaders.Rate', // Процентная ставка,
    type: 'string',
    isRequired: false,
    isDisabled: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'typeId',
    value: 'FinalDecision.TableHeaders.SuspensiveConditionsType', // Тип (отлагательные условия)
    type: 'lazySelect',
    isRequired: false,
    isDisabled: true,
    size: 'medium',
    selectDataName: OptionListNames.SuspensiveConditionsTypes,
    selectSearchCodeName: 'typeId'
    // selectPropertyName: 'suspensiveConditionsTypes'
  },
  {
    code: 'creditCode',
    value: 'FinalDecision.TableHeaders.CreditCode', // Кредитный код
    type: 'string',
    isRequired: false,
    isDisabled: false,
    maxLength: 16,
    inputValidator: bankCodeValidator,
    size: 'small',
    setDisableIf: (selectedRow: any) => {
      return !selectedRow.creditorOrganizationIsBank || selectedRow.creditCodeSource !== 'MANUAL';
    }
  },

  {
    code: 'clientAccount',
    value: 'FinalDecision.TableHeaders.CustomerAccount14', // Счёт клиента
    type: 'number',
    isRequired: false,
    isDisabled: false,
    maxLength: 20,
    size: 'small',
    setDisableIf: (selectedRow: any) => {
      return !(selectedRow.creditorOrganizationIsBank && !selectedRow.creditCode);
    },
    setRequiredField: (selectedRow: any) => {
      return selectedRow.creditorOrganizationIsBank && !selectedRow.creditCode;
    }
  },
  {
    code: 'loanAgreementNumber',
    value: 'FinalDecision.TableHeaders.NumberOfLoanAgreement', // Номер кредитного договора
    type: 'string',
    isRequired: false,
    isDisabled: false,
    maxLength: 20,
    size: 'small',
    setDisableIf: (selectedRow: any) => {
      return (
        !!(selectedRow.creditCode && !selectedRow.creditorOrganizationIsVtb) ||
        selectedRow.loanAgreementNumberSource !== 'MANUAL'
      );
    },
    setRequiredField: (selectedRow: any) => {
      return !selectedRow.creditCode;
    }
  },
  {
    code: 'accountYKO',
    value: 'FinalDecision.TableHeaders.UKOAccount', // Счёт УКО
    type: 'string',
    isRequired: false,
    isDisabled: false,
    pattern: /^[^6]/,
    maxLength: 20,
    size: 'medium',
    setDisableIf: (selectedRow: any) => {
      return selectedRow.creditorOrganizationIsBank;
    },
    setRequiredField: (selectedRow: any) => {
      return !selectedRow.creditorOrganizationIsBank;
    }
  }
];

// * Выбор счёта/карты
export const SELECTING_ACCOUNT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('accountName', 'FinalDecision.TableHeaders.AccountName', 'string'),
  new TableDataHeader('accountNumber', 'FinalDecision.TableHeaders.AccountNumber', 'string'),
  new TableDataHeader('currency', 'FinalDecision.TableHeaders.Currency', 'string'),
  new TableDataHeader('choose', 'FinalDecision.TableHeaders.Choose', 'button')
];

// * Выбранная карта/Выбранный счет
export const CHOSEN_ACCOUNT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('accountName', 'FinalDecision.TableHeaders.AccountCardName', 'string'),
  new TableDataHeader('accountNumber', 'FinalDecision.TableHeaders.AccountNumber', 'string'),
  new TableDataHeader('currency', 'FinalDecision.TableHeaders.Currency', 'string')
];

// approvedCreditConditions
export const APPROVED_CREDIT_CONDITIONS_WITH_REF_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameAm', 'FinalDecision.TableHeaders.Product', 'am'),
  new TableDataHeader('product.nameEn', 'FinalDecision.TableHeaders.Product', 'en'),
  new TableDataHeader('creditSum', 'FinalDecision.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'FinalDecision.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FinalDecision.TableHeaders.Rate', 'number'),
  new TableDataHeader('annPayment', 'FinalDecision.TableHeaders.MonthlyPayment', 'number'),
  new TableDataHeader('creditTerm', 'FinalDecision.TableHeaders.Term', 'wholeNumber'),
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
  new TableDataHeader('gracePeriod', 'FinalDecision.TableHeaders.GracePeriod', 'wholeNumber'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('refinanceLiabilities', 'FinalDecision.TableHeaders.RefLoans', 'string'),
  new TableDataHeader('choose', 'FinalDecision.TableHeaders.Choose', 'button')
];

// availableRefinancingOptionsData
export const AVAILABLE_REFINANCING_OPTIONS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('contractCode', 'FinalDecision.TableHeaders.LoanAgreement', 'string'),
  new TableDataHeader('startDate', 'FinalDecision.TableHeaders.AgreementDate', 'date'),
  new TableDataHeader('outstandingAmount', 'FinalDecision.TableHeaders.RefinancingAmount', 'number'),
  new TableDataHeader('outstandingAmountCurrency', 'FinalDecision.TableHeaders.Currency', 'string'),
  new TableDataHeader('contractIdentifier', 'FinalDecision.TableHeaders.ContractIdentifier', 'string'),
  new TableDataHeader('selected', 'FinalDecision.TableHeaders.Choose', 'toggle')
];

// selectedCreditConditionsData
export const SELECTED_CREDIT_TERMS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameAm', 'FinalDecision.TableHeaders.Product', 'am'),
  new TableDataHeader('product.nameEn', 'FinalDecision.TableHeaders.Product', 'en'),
  new TableDataHeader('creditAmount', 'FinalDecision.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'FinalDecision.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FinalDecision.TableHeaders.Rate', 'number'),
  new TableDataHeader('freshMoney', 'FinalDecision.TableHeaders.FreshMoney', 'number'),
  new TableDataHeader('monthlyPayment', 'FinalDecision.TableHeaders.MonthlyPayment', 'number'),
  new TableDataHeader('creditTerm', 'FinalDecision.TableHeaders.Term', 'wholeNumber'),
  new TableDataHeader('issueFee', 'FinalDecision.TableHeaders.IssuanceFee', 'number'),
  new TableDataHeader('restructureFee', 'FinalDecision.TableHeaders.RestructuringFee', 'number'),
  new TableDataHeader('prepaymentRate', 'FinalDecision.TableHeaders.PrepaymentCommission', 'number'),
  new TableDataHeader('overpayPrepaymentRate', 'FinalDecision.TableHeaders.EarlyRepaymentFee', 'number'),
  new TableDataHeader('paymentInOtherBankRate', 'FinalDecision.TableHeaders.RefinancingFeeAnotherBank', 'number'),
  new TableDataHeader('gracePeriod', 'FinalDecision.TableHeaders.GracePeriod', 'wholeNumber'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('refinanceLiabilities', 'FinalDecision.TableHeaders.RefLoans', 'string')
];

// contactPersonsTableHeaders
export const CONTACT_PERSONS_HEADERS: EditableTableHeader[] = [
  {
    code: 'firstName',
    value: 'FinalDecision.TableHeaders.FirstName',
    type: 'string',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'lastName',
    value: 'FinalDecision.TableHeaders.LastName',
    type: 'string',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'mobilePhone',
    value: 'FinalDecision.TableHeaders.MobilePhoneNumber',
    type: 'string',
    isRequired: false,
    size: 'small'
  },
  {
    code: 'dirFamilyRelationshipId',
    value: 'FinalDecision.TableHeaders.Relationship',
    type: 'select',
    isRequired: false,
    size: 'small',
    selectDataName: OptionListNames.Relationships
  }
];
