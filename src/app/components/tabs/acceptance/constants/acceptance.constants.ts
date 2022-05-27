import { TableDataHeader } from '@app/_models';

export const FINAL_CREDIT_INFO_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'Acceptance.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameGe', 'Acceptance.TableHeaders.Product', 'ge'),
  new TableDataHeader('product.nameEn', 'Acceptance.TableHeaders.Product', 'en'),
  new TableDataHeader('creditAmount', 'Acceptance.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'Acceptance.TableHeaders.Currency', 'string'),
  new TableDataHeader('rate', 'Acceptance.TableHeaders.Rate', 'number'),
  new TableDataHeader('freshMoney', 'Acceptance.TableHeaders.FreshMoney', 'number'),
  new TableDataHeader('monthlyPayment', 'Acceptance.TableHeaders.MonthlyPayment', 'number'),
  new TableDataHeader('creditTerm', 'Acceptance.TableHeaders.Term', 'wholeNumber'),
  new TableDataHeader('issueFee', 'Acceptance.TableHeaders.IssuanceFee', 'number'),
  new TableDataHeader('restructureFee', 'Acceptance.TableHeaders.RestructuringFee', 'number'),
  new TableDataHeader('prepaymentRate', 'Acceptance.TableHeaders.PrepaymentCommission', 'number'),
  new TableDataHeader('overpayPrepaymentRate', 'Acceptance.TableHeaders.EarlyRepaymentFee', 'number'),
  new TableDataHeader('paymentInOtherBankRate', 'Acceptance.TableHeaders.RefinancingFeeAnotherBank', 'number'),
  new TableDataHeader('gracePeriod', 'Acceptance.TableHeaders.GracePeriod', 'wholeNumber'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('refinanceLiabilities', 'Acceptance.TableHeaders.RefLoans', 'string')
];
