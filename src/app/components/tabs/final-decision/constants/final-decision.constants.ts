import { EditableTableHeader, OptionListNames, TableDataHeader } from '@app/_models';

// chosenCreditInfoData
export const CHOSEN_CREDIT_INFO_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameGe', 'FinalDecision.TableHeaders.Product', 'ge'),
  new TableDataHeader('product.nameEn', 'FinalDecision.TableHeaders.Product', 'en'),
  new TableDataHeader('creditAmount', 'FinalDecision.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'FinalDecision.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FinalDecision.TableHeaders.Rate', 'number'),
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

// approvedCreditConditions
export const APPROVED_CREDIT_CONDITIONS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameGe', 'FinalDecision.TableHeaders.Product', 'ge'),
  new TableDataHeader('product.nameEn', 'FinalDecision.TableHeaders.Product', 'en'),
  new TableDataHeader('creditSum', 'FinalDecision.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'FinalDecision.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FinalDecision.TableHeaders.Rate', 'number'),
  new TableDataHeader('annPayment', 'FinalDecision.TableHeaders.MonthlyPayment', 'number'),
  new TableDataHeader('creditTerm', 'FinalDecision.TableHeaders.Term', 'wholeNumber'),
  new TableDataHeader('issueFee', 'FinalDecision.TableHeaders.IssuanceFee', 'number'),
  new TableDataHeader('restructureFee', 'FinalDecision.TableHeaders.RestructuringFee', 'number'),
  new TableDataHeader('prepaymentRate', 'FinalDecision.TableHeaders.PrepaymentCommission', 'number'),
  new TableDataHeader('overpayPrepaymentRate', 'FinalDecision.TableHeaders.EarlyRepaymentFee', 'number'),
  new TableDataHeader('paymentInOtherBankRate', 'FinalDecision.TableHeaders.RefinancingFeeAnotherBank', 'number'),
  new TableDataHeader('gracePeriod', 'FinalDecision.TableHeaders.GracePeriod', 'wholeNumber'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('refinanceLiabilities', 'FinalDecision.TableHeaders.RefLoans', 'string'),
  new TableDataHeader('choose', 'FinalDecision.TableHeaders.Choose', 'button')
];

// approvedCreditConditions
export const APPROVED_CREDIT_CONDITIONS_WITH_REF_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameGe', 'FinalDecision.TableHeaders.Product', 'ge'),
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

// calculatedCreditConditionsData
export const CALCULATED_CREDIT_CONDITIONS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameGe', 'FinalDecision.TableHeaders.Product', 'ge'),
  new TableDataHeader('product.nameEn', 'FinalDecision.TableHeaders.Product', 'en'),
  new TableDataHeader('creditSum', 'FinalDecision.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'FinalDecision.TableHeaders.Currency', 'string', 'dirCurrency.id'),
  new TableDataHeader('rate', 'FinalDecision.TableHeaders.Rate', 'number'),
  new TableDataHeader('freshMoney', 'FinalDecision.TableHeaders.FreshMoney', 'number'),
  new TableDataHeader('annPayment', 'FinalDecision.TableHeaders.MonthlyPayment', 'number'),
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

// selectedCreditConditionsData
export const SELECTED_CREDIT_TERMS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'FinalDecision.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameGe', 'FinalDecision.TableHeaders.Product', 'ge'),
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

// selectingCardAccountData, selectingCurrentAccountData
export const SELECTING_ACCOUNT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('descriptionEn', 'FinalDecision.TableHeaders.AccountName', 'string'),
  new TableDataHeader('balance', 'FinalDecision.TableHeaders.Balance', 'string'),
  new TableDataHeader('currency', 'FinalDecision.TableHeaders.Currency', 'string'),
  new TableDataHeader('iban', 'FinalDecision.TableHeaders.IBAN', 'string'),
  new TableDataHeader('choose', 'FinalDecision.TableHeaders.Choose', 'button')
];

// chosenAccountData
export const CHOSEN_ACCOUNT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('descriptionEn', 'FinalDecision.TableHeaders.AccountName', 'string'),
  new TableDataHeader('balance', 'FinalDecision.TableHeaders.Balance', 'string'),
  new TableDataHeader('currency', 'FinalDecision.TableHeaders.Currency', 'string'),
  new TableDataHeader('iban', 'FinalDecision.TableHeaders.IBAN', 'string')
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
