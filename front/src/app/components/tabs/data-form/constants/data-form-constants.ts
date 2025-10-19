import { EditableTableHeader, OptionListNames, TableDataHeader } from '@app/_models';

export interface RefLiabilityKey {
  key: string;
  keyWithId: string;
}

// ?
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

// * 9. Предварительно одобренные условия кредитования анкета
export const POSSIBLE_CREDIT_PROPS_FORM: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'FullForm.TableHeaders.Product', 'am', 'product.nameAm'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('maxLimit', 'FullForm.Placeholder.MaxLoanAmount', 'number', 'maxLimit'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('maxAnnPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'maxAnnPayment'),
  new TableDataHeader('creditTermWithType', 'FullForm.TableHeaders.Term', 'ru', 'creditTermWithType'),
  new TableDataHeader('creditTermWithTypeAm', 'FullForm.TableHeaders.Term', 'am', 'creditTermWithTypeAm'),
  new TableDataHeader('singleFeeLoanIssueSum', 'FullForm.TableHeaders.IssuanceFee', 'string'),
  new TableDataHeader('monthlyFeeLoanAccSum', 'FullForm.TableHeaders.MounthlyCommission', 'string'),
  new TableDataHeader('monthlyFeeLoanAccAddSum', 'FullForm.TableHeaders.MounthlyCommissionForService', 'string'),
  new TableDataHeader('effectiveRate', 'FullForm.TableHeaders.EffectiveRate', 'string'),
  new TableDataHeader('choose', 'Buttons.Choose', 'button')
];

// inn duplicates
export const INN_COMPANY_DUPLICATE_TABLE: TableDataHeader[] = [
  new TableDataHeader('nameRu', 'FullForm.TableHeaders.CompanyName', 'ru', 'product.nameRu'),
  new TableDataHeader('nameAm', 'FullForm.TableHeaders.CompanyName', 'am', 'product.nameAm'),
  new TableDataHeader('choose', 'Buttons.Choose', 'button')
];

// * 9. Предварительно одобренные условия кредитования
export const POSSIBLE_CREDIT_PROPS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'FullForm.TableHeaders.Product', 'am', 'product.nameAm'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('maxLimit', 'FullForm.Placeholder.MaxLoanAmount', 'number', 'maxLimit'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('maxAnnPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'maxAnnPayment'),
  new TableDataHeader('creditTermWithType', 'FullForm.TableHeaders.Term', 'ru', 'creditTermWithType'),
  new TableDataHeader('creditTermWithTypeAm', 'FullForm.TableHeaders.Term', 'am', 'creditTermWithTypeAm'),
  // new TableDataHeader('singleFeeLoanIssueSum', 'FullForm.TableHeaders.IssuanceFee', 'string'),
  // new TableDataHeader('monthlyFeeLoanAccSum', 'FullForm.TableHeaders.MounthlyCommission', 'string'),
  // new TableDataHeader('monthlyFeeLoanAccAddSum', 'FullForm.TableHeaders.MounthlyCommissionForService', 'string'),
  new TableDataHeader('effectiveRate', 'FullForm.TableHeaders.EffectiveRate', 'string'),
  new TableDataHeader('choose', 'Buttons.Choose', 'button')
];

// * 10. Рассчитанные условия кредитования & Выбранные условия кредитования Анкета
export const PRODUCT_NAME_PROPS_FORM: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'FullForm.TableHeaders.Product', 'am', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('maxLimit', 'FullForm.TableHeaders.LoanAmount', 'number', 'maxLimit'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('maxAnnPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'maxAnnPayment'),
  new TableDataHeader('creditTermWithType', 'FullForm.TableHeaders.Term', 'ru', 'creditTermWithType'),
  new TableDataHeader('creditTermWithTypeAm', 'FullForm.TableHeaders.Term', 'am', 'creditTermWithTypeAm'),
  new TableDataHeader('singleFeeLoanIssueSum', 'FullForm.TableHeaders.IssuanceFee', 'string'),
  new TableDataHeader('monthlyFeeLoanAccSum', 'FullForm.TableHeaders.MounthlyCommission', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  new TableDataHeader('monthlyFeeLoanAccAddSum', 'FullForm.TableHeaders.MounthlyCommissionForService', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  new TableDataHeader('effectiveRate', 'FullForm.TableHeaders.EffectiveRate', 'string') // TODO ROmanovski: add 'code' name when rest api is ready
];

export const CREDIT_INFO_NAME_PROPS_FORM: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'FullForm.TableHeaders.Product', 'am', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('maxLimit', 'FullForm.TableHeaders.LoanAmount', 'number', 'maxLimit'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('monthlyPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'monthlyPayment'),
  new TableDataHeader('creditTermWithType', 'FullForm.TableHeaders.Term', 'ru', 'creditTermWithType'),
  new TableDataHeader('creditTermWithTypeAm', 'FullForm.TableHeaders.Term', 'am', 'creditTermWithTypeAm'),
  new TableDataHeader('singleFeeLoanIssueSum', 'FullForm.TableHeaders.IssuanceFee', 'string'),
  new TableDataHeader('monthlyFeeLoanAccSum', 'FullForm.TableHeaders.MounthlyCommission', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  new TableDataHeader('monthlyFeeLoanAccAddSum', 'FullForm.TableHeaders.MounthlyCommissionForService', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  new TableDataHeader('effectiveRate', 'FullForm.TableHeaders.EffectiveRate', 'string') // TODO ROmanovski: add 'code' name when rest api is ready
];

// * 10. Рассчитанные условия кредитования & Выбранные условия кредитования
export const PRODUCT_NAME_PROPS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'FullForm.TableHeaders.Product', 'am', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('maxLimit', 'FullForm.TableHeaders.LoanAmount', 'number', 'maxLimit'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('maxAnnPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'maxAnnPayment'),
  new TableDataHeader('creditTermWithType', 'FullForm.TableHeaders.Term', 'ru', 'creditTermWithType'),
  new TableDataHeader('creditTermWithTypeAm', 'FullForm.TableHeaders.Term', 'am', 'creditTermWithTypeAm'),
  // new TableDataHeader('singleFeeLoanIssueSum', 'FullForm.TableHeaders.IssuanceFee', 'string'),
  // new TableDataHeader('monthlyFeeLoanAccSum', 'FullForm.TableHeaders.MounthlyCommission', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  // new TableDataHeader('monthlyFeeLoanAccAddSum', 'FullForm.TableHeaders.MounthlyCommissionForService', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  new TableDataHeader('effectiveRate', 'FullForm.TableHeaders.EffectiveRate', 'string') // TODO ROmanovski: add 'code' name when rest api is ready
];

export const CREDIT_INFO_NAME_PROPS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'FullForm.TableHeaders.Product', 'am', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('maxLimit', 'FullForm.TableHeaders.LoanAmount', 'number', 'maxLimit'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('monthlyPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'monthlyPayment'),
  new TableDataHeader('creditTermWithType', 'FullForm.TableHeaders.Term', 'ru', 'creditTermWithType'),
  new TableDataHeader('creditTermWithTypeAm', 'FullForm.TableHeaders.Term', 'am', 'creditTermWithTypeAm'),
  // new TableDataHeader('singleFeeLoanIssueSum', 'FullForm.TableHeaders.IssuanceFee', 'string'),
  // new TableDataHeader('monthlyFeeLoanAccSum', 'FullForm.TableHeaders.MounthlyCommission', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  // new TableDataHeader('monthlyFeeLoanAccAddSum', 'FullForm.TableHeaders.MounthlyCommissionForService', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  new TableDataHeader('effectiveRate', 'FullForm.TableHeaders.EffectiveRate', 'string') // TODO ROmanovski: add 'code' name when rest api is ready
];
// Выбранные условия кредитования на Акцепт и Оформление Документов
export const CREDIT_INFO_NAME_PROPS_ACCEPT: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'FullForm.TableHeaders.Product', 'am', 'product.nameRu'),
  new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  new TableDataHeader('maxLimit', 'FullForm.TableHeaders.LoanAmount', 'number', 'maxLimit'),
  new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  new TableDataHeader('monthlyPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'monthlyPayment'),
  new TableDataHeader('creditTermWithType.nameRu', 'FullForm.TableHeaders.Term', 'ru', 'creditTermWithType.nameRu'),
  new TableDataHeader('creditTermWithType.nameAm', 'FullForm.TableHeaders.Term', 'am', 'creditTermWithType.nameAm'),
  new TableDataHeader('singleFeeLoanIssueSum', 'FullForm.TableHeaders.IssuanceFee', 'string'),
  new TableDataHeader('monthlyFeeLoanAccSum', 'FullForm.TableHeaders.MounthlyCommission', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  new TableDataHeader('monthlyFeeLoanAccAddSum', 'FullForm.TableHeaders.MounthlyCommissionForService', 'string'), // TODO ROmanovski: add 'code' name when rest api is ready
  new TableDataHeader('effectiveRate', 'FullForm.TableHeaders.EffectiveRate', 'string') // TODO ROmanovski: add 'code' name when rest api is ready
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
    value: 'FullForm.TableHeaders.CurrencyAmount', // Валюта кредита
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small'
  },
  {
    code: 'remainder',
    value: 'FinalDecision.TableHeaders.OutstandingAmount', // Остаток кредита
    type: 'string',
    isDisabled: true,
    isRequired: false,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'interestRates',
    value: 'FinalDecision.TableHeaders.Rate', // Процентная ставка,
    type: 'string',
    isDisabled: true,
    isRequired: false,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small'
  },
  {
    code: 'issueDate',
    value: 'FullForm.TableHeaders.BeginCreditDate', // Дата выдачи кредита
    type: 'Date',
    isRequired: false,
    isDisabled: true,
    size: 'small'
  },
  {
    code: 'maturityDate',
    value: 'FullForm.TableHeaders.EndCreditDate', // Дата погашения кредита
    type: 'Date',
    isRequired: false,
    isDisabled: true,
    size: 'small'
  },
  {
    code: 'typeId',
    value: '', // Тип (отлагательные условия)
    type: 'toggle',
    isDisabled: false,
    isRequired: false,
    // emptySelectOption: true,
    size: 'small'
    // selectDataName: 'SuspensiveConditionsTypesFiltered',
    // selectSearchCodeName: 'suspensiveConditionsTypes',
    // availableIdsForOptions: row => row.availableOptionsIds
  }
];

// * 10. if isWithRef === true
export const POSSIBLE_CREDIT_PROPS_WITH_REF: TableDataHeader[] = [
  // new TableDataHeader('product.nameRu', 'FullForm.TableHeaders.Product', 'ru', 'product.nameRu'),
  // new TableDataHeader('product.nameAm', 'FullForm.TableHeaders.Product', 'am', 'product.nameRu'),
  // new TableDataHeader('product.nameEn', 'FullForm.TableHeaders.Product', 'en', 'product.nameRu'),
  // new TableDataHeader('creditSum', 'FullForm.TableHeaders.LoanAmount', 'number', 'creditSum'),
  // new TableDataHeader('dirCurrency.id', 'FullForm.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  // new TableDataHeader('rate', 'FullForm.TableHeaders.Rate', 'number', 'rate'),
  // new TableDataHeader('annPayment', 'FullForm.TableHeaders.MonthlyPayment', 'number', 'annPayment'),
  // new TableDataHeader('creditTerm', 'FullForm.TableHeaders.Term', 'wholeNumber', 'creditTerm'),
  // new TableDataHeader('ref1AcbLiability.outstandingAmount', 'Credit1', 'number', 'ref1AcbLiability.outstandingAmount'),
  // new TableDataHeader(
  //   'ref1AcbLiability.totalCreditAmountCurrency',
  //   '',
  //   'string',
  //   'ref1AcbLiability.totalCreditAmountCurrency'
  // ),
  // new TableDataHeader('ref2AcbLiability.outstandingAmount', 'Credit2', 'number', 'ref2AcbLiability.outstandingAmount'),
  // new TableDataHeader(
  //   'ref2AcbLiability.totalCreditAmountCurrency',
  //   '',
  //   'string',
  //   'ref2AcbLiability.totalCreditAmountCurrency'
  // ),
  // new TableDataHeader('ref3AcbLiability.outstandingAmount', 'Credit3', 'number', 'ref3AcbLiability.outstandingAmount'),
  // new TableDataHeader(
  //   'ref3AcbLiability.totalCreditAmountCurrency',
  //   '',
  //   'string',
  //   'ref3AcbLiability.totalCreditAmountCurrency'
  // ),
  // new TableDataHeader('ref4AcbLiability.outstandingAmount', 'Credit4', 'number', 'ref4AcbLiability.outstandingAmount'),
  // new TableDataHeader(
  //   'ref4AcbLiability.totalCreditAmountCurrency',
  //   '',
  //   'string',
  //   'ref4AcbLiability.totalCreditAmountCurrency'
  // ),
  // new TableDataHeader('ref5AcbLiability.outstandingAmount', 'Credit5', 'number', 'ref5AcbLiability.outstandingAmount'),
  // new TableDataHeader(
  //   'ref5AcbLiability.totalCreditAmountCurrency',
  //   '',
  //   'string',
  //   'ref5AcbLiability.totalCreditAmountCurrency'
  // ),
  // new TableDataHeader('gracePeriod', 'FullForm.TableHeaders.GracePeriod', 'string'),
  // new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  // new TableDataHeader('choose', 'Buttons.Choose', 'button')
];

// ?
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
    code: 'inn',
    value: 'FullForm.TableHeaders.INN', // ИНН
    type: 'number',
    isRequired: false,
    size: 'small',
    maxLength: 12,
    emitOnBlur: true,
    setDisableIf: (selectedRow: any) => {
      return selectedRow.incomeSource === 'EXTERNAL';
    }
  },
  {
    code: 'name',
    value: 'FullForm.TableHeaders.CompanyName', // Наименование компании
    type: 'string',
    isRequired: false,
    size: 'small',
    setDisableIf: (selectedRow: any) => {
      return selectedRow.incomeSource === 'EXTERNAL';
    },
    setRequiredField: (selectedRow: any) => {
      return selectedRow.dirIncomeTypeId === 24 && selectedRow.incomeSource !== 'EXTERNAL';
    }
  },
  {
    code: 'code',
    value: 'FullForm.TableHeaders.CompanyCode', // Код корп компании
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small'
  },
  {
    code: 'segment',
    value: 'FullForm.TableHeaders.CompanySegment', // Сегмент корп компании
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small'
  },
  {
    code: 'industry',
    value: 'FullForm.TableHeaders.CompanyIndustry', // Отрасль компании"
    type: 'string',
    isRequired: false,
    isDisabled: true,
    size: 'small'
    // TODO Romanovski:  change 'optionsListName' when rest api is ready
  },
  {
    code: 'continuousLos',
    value: 'FullForm.TableHeaders.CurrentExperience', // Стаж в компании"
    type: 'number',
    isRequired: false,
    pattern: /^[0-9]\d*$/,
    size: 'small',
    setDisableIf: (selectedRow: any) => {
      return selectedRow.incomeSource === 'EXTERNAL';
    },
    setRequiredField: (selectedRow: any) => {
      return selectedRow.dirIncomeTypeId === 24 && selectedRow.incomeSource !== 'EXTERNAL';
    }

    // TODO Romanovski:  change 'optionsListName' when rest api is ready
  },
  {
    code: 'isBoss',
    value: 'FullForm.TableHeaders.Director', // Руководитель
    type: 'toggle',
    isRequired: false,
    size: 'small'
    // setDisableIf: (selectedRow: any) => {
    //   return selectedRow.incomeSource === 'EXTERNAL';
    // },
  },
  {
    code: 'income',
    value: 'FullForm.TableHeaders.Income', // Доход
    type: 'string',
    isRequired: true,
    pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
    size: 'small',
    setDisableIf: (selectedRow: any) => {
      return selectedRow.incomeSource === 'EXTERNAL';
    }
  },
  {
    code: 'dirCurrencyId',
    value: 'FullForm.TableHeaders.IncomeCurrency', // Валюта дохода
    type: 'lazySelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.Currencies,
    defaultValueInSelection: 'AMD',
    setDisableIf: (selectedRow: any) => {
      return selectedRow.incomeSource === 'EXTERNAL';
    }
  },
  {
    code: 'dirIncomeTypeId',
    value: 'FullForm.TableHeaders.IncomeType', // Тип дохода
    type: 'lazySelect',
    isRequired: true,
    size: 'small',
    selectDataName: OptionListNames.AvailableIncome,
    isDisabled: false,
    setDisableIf: (selectedRow: any) => {
      return selectedRow.incomeSource === 'EXTERNAL';
    },
    availableIdsForOptions: row => (row ? row.availableOptionsIds : null),

    availableIdsForOptionsProperty: 'availableOptionsIds'
  },
  {
    code: 'isSalaryTransfer', // TODO Romanovski:  change 'optionsListName' when rest api is ready
    value: 'FullForm.TableHeaders.PaymentTransferReadiness', // Готовность перевода з/п ВТ
    type: 'toggle',
    isRequired: false,
    size: 'small'
    // setDisableIf: (selectedRow: any) => {
    //   return selectedRow.incomeSource === 'EXTERNAL';
    // },
  },
  {
    code: 'isIncomeConsider',
    value: 'FullForm.TableHeaders.IncomeUsed', // Учитывать доход
    type: 'toggle',
    isRequired: false,
    size: 'small'
    // setDisableIf: (selectedRow: any) => {
    //   return selectedRow.incomeSource === 'EXTERNAL';
    // },
  }
];

// * 8. Обязательства
// export const APPLICANT_LOAN_TABLE_HEADERS: EditableTableHeader[] = [
//   {
//     code: 'creditorOrganization',
//     value: 'FullForm.TableHeaders.BankName', // Банк-кредитор
//     type: 'string',
//     isRequired: true,
//     isDisabled: true,
//     size: 'medium'
//   },
//   {
//     code: 'contractCode',
//     value: 'FullForm.TableHeaders.ContractCode', // Код договора
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'amount',
//     value: 'FullForm.TableHeaders.InitialLoanAmount', // Первоначальная сумма кредита
//     type: 'string',
//     isRequired: true,
//     isDisabled: true,
//     pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
//     size: 'small'
//   },
//   {
//     code: 'dirCurrencyId',
//     value: 'FullForm.TableHeaders.CurrencyAmount', // Валюта кредита
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     // valueType : ValueType.Object,
//     // selectDataName: OptionListNames.Currencies,
//     // selectPropertyName: 'id',
//     size: 'small'
//   },
//   {
//     code: 'remainder',
//     value: 'FullForm.TableHeaders.OutstandingAmount', // Остаток кредита
//     type: 'string',
//     isRequired: true,
//     isDisabled: true,
//     pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
//     size: 'small'
//   },
//   {
//     code: 'interestRates',
//     value: 'FullForm.TableHeaders.Rate', // Процентная ставка,
//     type: 'string',
//     isRequired: true,
//     isDisabled: true,
//     pattern: /^(?!$)\d{0,8}(?:\.\d{1,2})?$/,
//     size: 'small'
//   },
//   {
//     code: 'issueDate',
//     value: 'FullForm.TableHeaders.BeginCreditDate', // Дата выдачи кредита
//     type: 'Date',
//     isRequired: true,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'maturityDate',
//     value: 'FullForm.TableHeaders.EndCreditDate', // Дата погашения кредита
//     type: 'Date',
//     isRequired: true,
//     isDisabled: true,
//     size: 'small'
//   },
//   // {
//   //   code: 'type',
//   //   value: 'FullForm.TableHeaders.SuspensiveConditionsType', // Тип (отлагательные условия)
//   //   type: 'lazySelect',
//   //   isRequired: true,
//   //   size: 'medium',
//   //   selectDataName: OptionListNames.SuspensiveConditionsTypes,
//   //   valueType: ValueType.Object,
//   //   selectSearchCodeName: 'suspensiveConditionsTypes',
//   // }
//   {
//     code: 'creditorOrganization',
//     value: 'FullForm.TableHeaders.СreditorOrganization', // Организация-кредитор
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'isCreditLine',
//     value: 'FullForm.TableHeaders.CreditLine', // Кредитная линия да/нет
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'isKPZZ',
//     value: 'FullForm.TableHeaders.KPZZ', // КПЗЗ да/нет
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'dirLiabilityStatusRemap',
//     value: 'FullForm.TableHeaders.Status', // Статус
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'amount',
//     value: 'FullForm.TableHeaders.Amount', // Сумма
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'amountActuallyIssued',
//     value: 'FullForm.TableHeaders.AmountActuallyIssued', // Фактически выданная сумма
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'dirCurrencyRemap',
//     value: 'FullForm.TableHeaders.Currency', // Валюта
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'issueDate',
//     value: 'FullForm.TableHeaders.IssueDate', // Дата выдачи
//     type: 'Date',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'maturityDate',
//     value: 'FullForm.TableHeaders.PaymentDay', // Дата погашения
//     type: 'Date',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'dateOfLastRepayment',
//     value: 'FullForm.TableHeaders.DateOfLastRepayment', // Дата последнего погашения
//     type: 'Date',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'remainder',
//     value: 'FullForm.TableHeaders.Remainder', // Остаток
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'overdueAmount',
//     value: 'FullForm.TableHeaders.OverdueAmountSum', // Просроченная сумма
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'overdueInterest',
//     value: 'FullForm.TableHeaders.OverdueInterest', // Просроченный процент
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'interestRates',
//     value: 'FullForm.TableHeaders.InterestRates', // Процентная ставка
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'overdueAmount',
//     value: 'FullForm.TableHeaders.CreditSubclass', // Подкласс кредита
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'worstRiskClassRemap',
//     value: 'FullForm.TableHeaders.WorstRiskClass', // Наихудший класс риска
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'pledgeListRemap',
//     value: 'FullForm.TableHeaders.Deposit', // Залог
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'dirLiabilityKindRemap',
//     value: 'FullForm.TableHeaders.TypeOfLoan', // Вид кредита
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   },
//   {
//     code: 'monthlyLoanPayment',
//     value: 'FullForm.TableHeaders.MonthlyLoanPayment', // Ежемесячный взнос по кредиту
//     type: 'string',
//     isRequired: false,
//     isDisabled: true,
//     size: 'small'
//   }
// ];

export const APPLICANT_LOAN_TABLE_HEADERS: TableDataHeader[] = [
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
    'dirLiabilityStatusRu',
    'FullForm.TableHeaders.Status', // Статус
    'ru',
    'dirLiabilityStatusRu'
  ).setFilter({ filterProperty: 'status' }),
  new TableDataHeader(
    'dirLiabilityStatusAm',
    'FullForm.TableHeaders.Status', // Статус
    'am',
    'dirLiabilityStatusAm'
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
    'dirCurrency',
    'FullForm.TableHeaders.LoanCurrency', // Валюта
    'string',
    'dirCurrency'
  ),
  new TableDataHeader(
    'issueDateRemap',
    'FullForm.TableHeaders.IssueDate', // Дата выдачи
    'date',
    'issueDateRemap'
  ),
  new TableDataHeader(
    'maturityDateRemap',
    'FullForm.TableHeaders.PaymentDay', // Дата погашения
    'date',
    'maturityDateRemap'
  ),
  new TableDataHeader(
    'dateOfLastRepaymentRemap',
    'FullForm.TableHeaders.DateOfLastRepayment', // Дата последнего погашения
    'date',
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
    'creditSubclassRemapRu',
    'FullForm.TableHeaders.CreditSubclass', // Подкласс кредита
    'ru',
    'creditSubclassRemapRu'
  ),
  new TableDataHeader(
    'creditSubclassRemapAm',
    'FullForm.TableHeaders.CreditSubclass', // Подкласс кредита
    'am',
    'creditSubclassRemapAm'
  ),
  new TableDataHeader(
    'worstRiskClassRemapRu',
    'FullForm.TableHeaders.WorstRiskClass', // Наихудший класс риска
    'ru',
    'worstRiskClassRemapRu'
  ),
  new TableDataHeader(
    'worstRiskClassRemapAm',
    'FullForm.TableHeaders.WorstRiskClass', // Наихудший класс риска
    'am',
    'worstRiskClassRemapAm'
  ),
  new TableDataHeader('codeOfPledgeRu', 'HistoryResponse.TableHeaders.Deposit', 'ru', 'codeOfPledgeRu'), // Залог
  new TableDataHeader('codeOfPledgeAm', 'HistoryResponse.TableHeaders.Deposit', 'am', 'codeOfPledgeAm'), // Залог
  new TableDataHeader(
    'dirLiabilityTypeAm',
    'FullForm.TableHeaders.TypeOfLoan', // Вид кредита
    'am',
    'dirLiabilityTypeAm'
  ).setFilter({ filterProperty: 'typeOfLoan' }),
  new TableDataHeader(
    'dirLiabilityTypeRu',
    'FullForm.TableHeaders.TypeOfLoan', // Вид кредита
    'ru',
    'dirLiabilityTypeRu'
  ).setFilter({ filterProperty: 'typeOfLoan' }),
  new TableDataHeader(
    'monthlyLoanPayment',
    'FullForm.TableHeaders.MonthlyLoanPayment', // Ежемесячный взнос по кредиту
    'string',
    'monthlyLoanPayment'
  )
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
