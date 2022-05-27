import {TableDataHeader} from "@app/_models";

export const RELATED_PERSONS: TableDataHeader[] = [
  new TableDataHeader('CLIENT_NO', 'InsideInfo.TableHeaders.ClientNo', 'string', 'CLIENT_NO'),
  new TableDataHeader('REL_CLIENT_NAME', 'InsideInfo.TableHeaders.RelClientName', 'string', 'REL_CLIENT_NAME'),
  new TableDataHeader('REL_CLIENT_NO', 'InsideInfo.TableHeaders.RelClientNo', 'string', 'REL_CLIENT_NO'),
  new TableDataHeader('CLIENT_RELATION_TYPE', 'InsideInfo.TableHeaders.ClientRelationType', 'string', 'CLIENT_RELATION_TYPE'),
  new TableDataHeader('VALUE', 'InsideInfo.TableHeaders.Value', 'string', 'VALUE'),
  new TableDataHeader('RELATED_CLIENT_IS_INSIDER', 'InsideInfo.TableHeaders.RelatedClientIsInsider', 'status', 'RELATED_CLIENT_IS_INSIDER'),
];

export const INTERNAL_LOAN_HISTORY: TableDataHeader[] = [
  new TableDataHeader('productName', 'InsideInfo.TableHeaders.ProductName', 'string', 'productName'),
  new TableDataHeader('amount', 'InsideInfo.TableHeaders.Amount', 'number', 'amount'),
  new TableDataHeader('ccy', 'InsideInfo.TableHeaders.Currency', 'string', 'ccy'),
  new TableDataHeader('agreementNo', 'InsideInfo.TableHeaders.AgreementNo', 'string', 'agreementNo'),
  new TableDataHeader('termStart', 'InsideInfo.TableHeaders.TermStart', 'date', 'termStart'),
  new TableDataHeader('termEnd', 'InsideInfo.TableHeaders.TermEnd', 'date', 'termEnd'),
  new TableDataHeader('principalTotal', 'InsideInfo.TableHeaders.PrincipalTotal', 'number', 'principalTotal'),
  new TableDataHeader('pmtAmountRegular', 'InsideInfo.TableHeaders.PmtAmountRegular', 'number', 'pmtAmountRegular'),
  new TableDataHeader('guaranteeType', 'InsideInfo.TableHeaders.GuaranteeType', 'string', 'guaranteeType'),
  new TableDataHeader('interestRate', 'InsideInfo.TableHeaders.InterestRate', 'number', 'interestRate'),
  new TableDataHeader('provisioningRate', 'InsideInfo.TableHeaders.ProvisioningRate', 'number', 'provisioningRate'),
  new TableDataHeader('isRestructuring', 'InsideInfo.TableHeaders.IsRestructuring', 'status', 'isRestructuring'),
  new TableDataHeader('isGracePeriod', 'InsideInfo.TableHeaders.IsGracePeriod', 'status', 'isGracePeriod'),
];

export const OVERDUE_PAYMENT_INFO: TableDataHeader[] = [
  new TableDataHeader('debtOverdueDays', 'InsideInfo.TableHeaders.DebtOverdueDays', 'wholeNumber', 'debtOverdueDays'),
  new TableDataHeader('debtOverdueTotal', 'InsideInfo.TableHeaders.DebtOverdueTotal', 'number', 'debtOverdueTotal'),
  new TableDataHeader('totalNumberOfDelinquencyDays', 'InsideInfo.TableHeaders.TotalNumberOfDelinquencyDays', 'wholeNumber', 'totalNumberOfDelinquencyDays'),
];
