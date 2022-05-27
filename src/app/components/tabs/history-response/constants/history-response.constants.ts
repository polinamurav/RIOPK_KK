import { TableDataHeader } from '@app/_models';

//pinCreditInfoResponse
export const CREDIT_INFO_RESPONSE: TableDataHeader[] = [
  new TableDataHeader(
    'inquiriesLast1Month',
    'HistoryResponse.TableHeaders.InquiriesLast1Month',
    'string',
    'inquiriesLast1Month'
  ),
  new TableDataHeader(
    'inquiriesLast3Month',
    'HistoryResponse.TableHeaders.InquiriesLast3Month',
    'string',
    'inquiriesLast3Month'
  ),
  new TableDataHeader(
    'inquiriesLast6Month',
    'HistoryResponse.TableHeaders.InquiriesLast6Month',
    'string',
    'inquiriesLast6Month'
  ),
  new TableDataHeader(
    'inquiriesLast12Month',
    'HistoryResponse.TableHeaders.InquiriesLast12Month',
    'string',
    'inquiriesLast12Month'
  )
];

//creditInfoContracts.
export const CREDIT_INFO_CONTRACT: TableDataHeader[] = [
  new TableDataHeader('status', 'HistoryResponse.TableHeaders.Status', 'string', 'status'),
  new TableDataHeader('roleOfClient', 'HistoryResponse.TableHeaders.RoleOfClient', 'string', 'roleOfClient'),
  new TableDataHeader('contractCode', 'HistoryResponse.TableHeaders.ContractCode', 'string', 'contractCode'),
  new TableDataHeader(
    'totalCreditAmount',
    'HistoryResponse.TableHeaders.TotalCreditAmount',
    'string',
    'totalCreditAmount'
  ),
  new TableDataHeader(
    'totalCreditAmountCurrency',
    'HistoryResponse.TableHeaders.TotalCreditAmountCurrency',
    'string',
    'totalCreditAmountCurrency'
  ),
  new TableDataHeader('startDate', 'HistoryResponse.TableHeaders.StartDate', 'date', 'startDate'),
  new TableDataHeader('expectedEndDate', 'HistoryResponse.TableHeaders.ExpectedEndDate', 'date', 'expectedEndDate'),
  new TableDataHeader('loanType', 'HistoryResponse.TableHeaders.LoanType', 'string', 'loanType'),
  new TableDataHeader('creditPurpose', 'HistoryResponse.TableHeaders.CreditPurpose', 'string', 'creditPurpose'),
  new TableDataHeader('creditor', 'HistoryResponse.TableHeaders.Creditor', 'string', 'creditor'),
  new TableDataHeader('currentStatus', 'HistoryResponse.TableHeaders.CurrentStatus', 'string', 'currentStatus')
];

export const CREDIT_INFO_CONTRACT_TWO: TableDataHeader[] = [
  new TableDataHeader(
    'outstandingAmount',
    'HistoryResponse.TableHeaders.OutstandingAmount',
    'number',
    'outstandingAmount'
  ),
  new TableDataHeader('overdueAmount', 'HistoryResponse.TableHeaders.OverdueAmount', 'number', 'overdueAmount'),
  new TableDataHeader(
    'currentOverduePrincipalAmount',
    'HistoryResponse.TableHeaders.CurrentOverduePrincipalAmount',
    'number',
    'currentOverduePrincipalAmount'
  ),
  new TableDataHeader(
    'currentOverdueInterestAndCommissionAmount',
    'HistoryResponse.TableHeaders.CurrentOverdueInterestAndCommissionAmount',
    'number',
    'currentOverdueInterestAndCommissionAmount'
  ),
  new TableDataHeader(
    'daysInDeliquency',
    'HistoryResponse.TableHeaders.DaysInDeliquency',
    'wholeNumber',
    'daysInDeliquency'
  ),
  new TableDataHeader(
    'totalNumberOfDelinquencyDays',
    'HistoryResponse.TableHeaders.TotalNumberOfDelinquencyDays',
    'string',
    'totalNumberOfDelinquencyDays'
  ),
  new TableDataHeader(
    'totalNumberOfOverdueInstalments',
    'HistoryResponse.TableHeaders.TotalNumberOfOverdueInstalments',
    'string',
    'totalNumberOfOverdueInstalments'
  ),
  new TableDataHeader(
    'brmsMonthlyPayment',
    'HistoryResponse.TableHeaders.BrmsMonthlyPayment',
    'number',
    'brmsMonthlyPayment'
  ),
  new TableDataHeader(
    'contractIdentifier',
    'HistoryResponse.TableHeaders.ContractIdentifier',
    'string',
    'contractIdentifier'
  )
];

//creditInfoContractGuarantees
export const CREDIT_INFO_CONTRACT_GUARANTEE: TableDataHeader[] = [
  new TableDataHeader('guaranteeType', 'HistoryResponse.TableHeaders.GuaranteeType', 'string', 'guaranteeType'),
  new TableDataHeader('guaranteeAmount', 'HistoryResponse.TableHeaders.GuaranteeAmount', 'number', 'guaranteeAmount'),
  new TableDataHeader(
    'guaranteeCurrency',
    'HistoryResponse.TableHeaders.GuaranteeCurrency',
    'string',
    'guaranteeCurrency'
  )
];

//creditInfoContractSubjects
export const CREDIT_INFO_CONTRACT_SUBJECTS: TableDataHeader[] = [
  new TableDataHeader('pin', 'HistoryResponse.TableHeaders.Pin', 'string', 'pin'),
  new TableDataHeader('firstName', 'HistoryResponse.TableHeaders.FirstName', 'string', 'firstName'),
  new TableDataHeader('lastName', 'HistoryResponse.TableHeaders.LastName', 'string', 'lastName')
];
