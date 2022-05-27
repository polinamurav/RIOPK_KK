import { TableDataHeader } from '@app/_models';

export const FINAL_CREDIT_INFO_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'Paperwork.TableHeaders.Product', 'ru'),
  new TableDataHeader('product.nameGe', 'Paperwork.TableHeaders.Product', 'ge'),
  new TableDataHeader('product.nameEn', 'Paperwork.TableHeaders.Product', 'en'),
  new TableDataHeader('creditAmount', 'Paperwork.TableHeaders.LoanAmount', 'number'),
  new TableDataHeader('dirCurrency.id', 'Paperwork.TableHeaders.Currency', 'string'),
  new TableDataHeader('rate', 'Paperwork.TableHeaders.Rate', 'number'),
  new TableDataHeader('freshMoney', 'Paperwork.TableHeaders.FreshMoney', 'number'),
  new TableDataHeader('monthlyPayment', 'Paperwork.TableHeaders.MonthlyPayment', 'number'),
  new TableDataHeader('creditTerm', 'Paperwork.TableHeaders.Term', 'wholeNumber'),
  new TableDataHeader('issueFee', 'Paperwork.TableHeaders.IssuanceFee', 'number'),
  new TableDataHeader('restructureFee', 'Paperwork.TableHeaders.RestructuringFee', 'number'),
  new TableDataHeader('prepaymentRate', 'Paperwork.TableHeaders.PrepaymentCommission', 'number'),
  new TableDataHeader('overpayPrepaymentRate', 'Paperwork.TableHeaders.EarlyRepaymentFee', 'number'),
  new TableDataHeader('paymentInOtherBankRate', 'Paperwork.TableHeaders.RefinancingFeeAnotherBank', 'number'),
  new TableDataHeader('gracePeriod', 'Paperwork.TableHeaders.GracePeriod', 'wholeNumber'),
  new TableDataHeader('dtiAfterScoring', 'DTI', 'string'),
  new TableDataHeader('refinanceLiabilities', 'Paperwork.TableHeaders.RefLoans', 'string')
];
