import { TableDataHeader } from '@app/_models';

export const WORST_RISK_CLASS_PROPS: TableDataHeader[] = [
  new TableDataHeader(
    'inquiriesEntirePeriod',
    'HistoryResponse.TableHeaders.InquiriesEntirePeriod',
    'string',
    'inquiriesEntirePeriod'
  ),
  new TableDataHeader(
    'worstRiskClass1to12month',
    'HistoryResponse.TableHeaders.Inquiries1to12Month',
    'string',
    'worstRiskClass1to12month'
  ),
  new TableDataHeader(
    'worstRiskClass13to24month',
    'HistoryResponse.TableHeaders.Inquiries13to24Month',
    'string',
    'worstRiskClass13to24month'
  ),
  new TableDataHeader(
    'worstRiskClassActiveLoans',
    'HistoryResponse.TableHeaders.WorstRiskClassActiveLoans',
    'string',
    'worstRiskClassActiveLoans'
  ),
  new TableDataHeader(
    'worstRiskClassPaidOffLoans',
    'HistoryResponse.TableHeaders.WorstRiskClassPaidOffLoans',
    'string',
    'worstRiskClassPaidOffLoans'
  ),
  new TableDataHeader(
    'worstRiskClassPaidOffLoans1to24month',
    'HistoryResponse.TableHeaders.WorstRiskClassPaidOffLoans1to24month',
    'string',
    'worstRiskClassPaidOffLoans1to24month'
  ),
  new TableDataHeader(
    'worstRiskClassOnSureties',
    'HistoryResponse.TableHeaders.WorstRiskClassOnSureties',
    'string',
    'worstRiskClassOnSureties'
  ),
  new TableDataHeader(
    'numberOfLoanRiskClassReviews',
    'HistoryResponse.TableHeaders.NumberOfLoanRiskClassReviews',
    'string',
    'numberOfLoanRiskClassReviews'
  )
];

export const OVERDUE_PROPS: TableDataHeader[] = [
  new TableDataHeader(
    'daysOfDelayedPayments',
    'HistoryResponse.TableHeaders.DaysOfDelayedPayments',
    'string',
    'daysOfDelayedPayments'
  ),
  new TableDataHeader(
    'numberOfOverdueDays1to12month',
    'HistoryResponse.TableHeaders.NumberOfOverdueDays1to12Month',
    'string',
    'numberOfOverdueDays1to12month'
  ),
  new TableDataHeader(
    'numberOfOverdueDays13to24month',
    'HistoryResponse.TableHeaders.NumberOfOverdueDays13to24Month',
    'string',
    'numberOfOverdueDays13to24month'
  ),
  new TableDataHeader(
    'numberOfCasesOfDelay',
    'HistoryResponse.TableHeaders.NumberOfCasesOfDelay',
    'string',
    'numberOfCasesOfDelay'
  )
];

export const OBLIGATIONS_PROPS: TableDataHeader[] = [
  new TableDataHeader(
    'creditorOrganization',
    'HistoryResponse.TableHeaders.СreditorOrganization',
    'string',
    'creditorOrganization',
    '',
    ''
  ).setFilter(),
  new TableDataHeader(
    'isCreditLine',
    'HistoryResponse.TableHeaders.CreditLine',
    'string',
    'isCreditLine',
    '',
    ''
  ).setFilter({ isBoolean: true }),
  new TableDataHeader('isKPZZ', 'HistoryResponse.TableHeaders.IsKPZZ', 'string', 'isKPZZ', '', '').setFilter({
    isBoolean: true
  }),
  new TableDataHeader(
    'dirLiabilityStatusRu',
    'HistoryResponse.TableHeaders.Status',
    'ru',
    'dirLiabilityStatusRu',
    '',
    ''
  ).setFilter({ filterProperty: 'status' }),
  new TableDataHeader(
    'dirLiabilityStatusAm',
    'HistoryResponse.TableHeaders.Status',
    'am',
    'dirLiabilityStatusAm',
    '',
    ''
  ).setFilter({ filterProperty: 'status' }),
  new TableDataHeader('amount', 'HistoryResponse.TableHeaders.Amount', 'string', 'amount'),
  new TableDataHeader('currency', 'HistoryResponse.TableHeaders.Currency', 'string', 'currency'),
  new TableDataHeader('agreementDate', 'HistoryResponse.TableHeaders.AgreementDate', 'date', 'agreementDate'),
  new TableDataHeader('issueDate', 'HistoryResponse.TableHeaders.IssueDate', 'date', 'issueDate'),
  new TableDataHeader('maturityDate', 'HistoryResponse.TableHeaders.RedemptionDate', 'date', 'maturityDate'),
  new TableDataHeader('remainder', 'HistoryResponse.TableHeaders.Remainder', 'string', 'remainder'),
  new TableDataHeader('overdueAmount', 'HistoryResponse.TableHeaders.OverdueAmount', 'string', 'overdueAmount'),
  new TableDataHeader('overdueInterest', 'HistoryResponse.TableHeaders.OverdueInterest', 'string', 'overdueInterest'),
  new TableDataHeader('interestRates', 'HistoryResponse.TableHeaders.InterestRates', 'string', 'interestRates'),
  new TableDataHeader(
    'isPenaltiesAndFines',
    'HistoryResponse.TableHeaders.IsPenaltiesAndFines',
    'string',
    'isPenaltiesAndFines'
  ),
  new TableDataHeader('creditSubclassRu', 'HistoryResponse.TableHeaders.CreditSubclass', 'ru', 'creditSubclassRu'), // Подкласс кредита
  new TableDataHeader('creditSubclassAm', 'HistoryResponse.TableHeaders.CreditSubclass', 'am', 'creditSubclassAm'), // Подкласс кредита
  new TableDataHeader(
    'dateOfLastRepayment',
    'HistoryResponse.TableHeaders.DateOfLastRepayment',
    'date',
    'dateOfLastRepayment'
  ), // Дата последнего погашения
  new TableDataHeader('worstRiskClassRu', 'HistoryResponse.TableHeaders.WorstRiskClass', 'ru', 'worstRiskClassRu'), // Наихудший класс риска
  new TableDataHeader('worstRiskClassAm', 'HistoryResponse.TableHeaders.WorstRiskClass', 'am', 'worstRiskClassAm'), // Наихудший класс риска
  new TableDataHeader(
    'worstRiskClass1to12monthAbsName',
    'HistoryResponse.TableHeaders.WorstRiskClass1to12Month',
    'ru',
    'worstRiskClass1to12monthAbsName'
  ), // Наихудший класс риска (1-12 мес.)
  new TableDataHeader(
    'worstRiskClass1to12monthAm',
    'HistoryResponse.TableHeaders.WorstRiskClass1to12Month',
    'am',
    'worstRiskClass1to12monthAm'
  ), // Наихудший класс риска (1-12 мес.)
  new TableDataHeader(
    'worstRiskClass13to24monthAbsName',
    'HistoryResponse.TableHeaders.WorstRiskClass13to24Month',
    'ru',
    'worstRiskClass13to24monthAbsName'
  ), // Наихудший класс риска (13-24 мес.)
  new TableDataHeader(
    'worstRiskClass13to24monthAm',
    'HistoryResponse.TableHeaders.WorstRiskClass13to24Month',
    'am',
    'worstRiskClass13to24monthAm'
  ), // Наихудший класс риска (13-24 мес.)
  new TableDataHeader(
    'numberOfCasesOfDelay',
    'HistoryResponse.TableHeaders.NumberOfCasesOfDelay',
    'string',
    'numberOfCasesOfDelay'
  ),
  new TableDataHeader(
    'daysOfDelayedPayments',
    'HistoryResponse.TableHeaders.DaysOfDelayedPayments',
    'string',
    'daysOfDelayedPayments'
  ),
  new TableDataHeader(
    'numberOfOverdueDays1to12month',
    'HistoryResponse.TableHeaders.NumberOfOverdueDays1to12Month',
    'string',
    'numberOfOverdueDays1to12month'
  ),
  new TableDataHeader(
    'numberOfOverdueDays13to24month',
    'HistoryResponse.TableHeaders.NumberOfOverdueDays13to24Month',
    'string',
    'numberOfOverdueDays13to24month'
  ),
  new TableDataHeader(
    'numberOfOverdueDays1to24month',
    'HistoryResponse.TableHeaders.NumberOfOverdueDays1to24Month',
    'string',
    'numberOfOverdueDays1to24month'
  ),
  new TableDataHeader(
    'numberOfLoanClassReviews',
    'HistoryResponse.TableHeaders.NumberOfLoanClassReviews',
    'string',
    'numberOfLoanClassReviews',
    '',
    ''
  ).setFilter({ isBoolean: true, booleanValues: { yes: 'Buttons.Revised', no: 'Buttons.NotRevised' } }),
  new TableDataHeader(
    'numberOfLoanClassReviews1to36month',
    'HistoryResponse.TableHeaders.NumberOfLoanClassReviews1to36month',
    'string',
    'numberOfLoanClassReviews1to36month'
  ),
  new TableDataHeader(
    'referenceInformation',
    'HistoryResponse.TableHeaders.ReferenceInformation',
    'string',
    'referenceInformation'
  ), // Справочная информация

  new TableDataHeader(
    'amountActuallyIssued',
    'HistoryResponse.TableHeaders.AmountActuallyIssued',
    'string',
    'amountActuallyIssued'
  ),
  // new TableDataHeader(
  //   'numberOfGuarantors',
  //   'HistoryResponse.TableHeaders.NumberOfGuarantors',
  //   'string',
  //   'numberOfGuarantors'
  // ),
  new TableDataHeader(
    'amountOfPledgeDeposit',
    'HistoryResponse.TableHeaders.AmountOfDeposit',
    'string',
    'amountOfPledgeDeposit'
  ),
  new TableDataHeader(
    'currencyOfPledge',
    'HistoryResponse.TableHeaders.CurrencyOfDeposit',
    'string',
    'currencyOfPledge'
  ),
  new TableDataHeader('codeOfPledge', 'HistoryResponse.TableHeaders.DepositCode', 'string', 'codeOfPledge'), // Код Залога
  new TableDataHeader('codeOfPledgeRu', 'HistoryResponse.TableHeaders.Deposit', 'ru', 'codeOfPledgeRu'), // Код Залога
  new TableDataHeader('codeOfPledgeAm', 'HistoryResponse.TableHeaders.Deposit', 'am', 'codeOfPledgeAm'), // Код Залога
  new TableDataHeader('collateralNotes', 'HistoryResponse.TableHeaders.NotesAboutDeposit', 'string', 'collateralNotes'),
  // new TableDataHeader(
  //   'dirLiabilityKindRu',
  //   'HistoryResponse.TableHeaders.TypeOfLoan',
  //   'string',
  //   'dirLiabilityKindRu',
  //   '',
  //   ''
  // ).setFilter({ filterProperty: 'typeOfLoan' }),
  new TableDataHeader( // Вид Кредита
    'dirLiabilityKindAm',
    'HistoryResponse.TableHeaders.TypeOfLoan',
    'am',
    'dirLiabilityKindAm',
    '',
    ''
  ).setFilter({ filterProperty: 'typeOfLoan' }), // Вид Кредита
  new TableDataHeader(
    'dirLiabilityKindRu',
    'HistoryResponse.TableHeaders.TypeOfLoan',
    'ru',
    'dirLiabilityKindRu',
    '',
    ''
  ).setFilter({ filterProperty: 'typeOfLoan' }),
  new TableDataHeader(
    'fieldOfUseOfLoan',
    'HistoryResponse.TableHeaders.FieldOfUseOfLoan',
    'string',
    'fieldOfUseOfLoan'
  ),
  new TableDataHeader(
    'codeOfFieldOfUseOfLoan',
    'HistoryResponse.TableHeaders.codeOfFieldOfUseOfLoan',
    'string',
    'codeOfFieldOfUseOfLoan'
  ),
  // new TableDataHeader(
  //   'overdueDaysOfGuarantor',
  //   'HistoryResponse.TableHeaders.OverdueDaysOfGuarantor',
  //   'string',
  //   'overdueDaysOfGuarantor'
  // ),
  new TableDataHeader(
    'worstCreditClass1to24monthAm',
    'HistoryResponse.TableHeaders.WorstCreditClass1to24month',
    'am',
    'worstCreditClass1to24monthAm'
  ), // Наихудший класс кредита 1-24 мес
  new TableDataHeader(
    'worstCreditClass1to24monthAbsName',
    'HistoryResponse.TableHeaders.WorstCreditClass1to24month',
    'ru',
    'worstCreditClass1to24monthAbsName'
  ), // Наихудший класс кредита 1-24 мес
  new TableDataHeader(
    'worstCreditClass25to36monthAbsName',
    'HistoryResponse.TableHeaders.WorstCreditClass25to36month',
    'ru',
    'worstCreditClass25to36monthAbsName'
  ),
  new TableDataHeader(
    'worstCreditClass25to36monthAm',
    'HistoryResponse.TableHeaders.WorstCreditClass25to36month',
    'am',
    'worstCreditClass25to36monthAm'
  ),
  new TableDataHeader(
    'numberOfOverdueDays1to2month',
    'HistoryResponse.TableHeaders.NumberOfOverdueDays1to2month',
    'string',
    'numberOfOverdueDays1to2month'
  ),
  new TableDataHeader(
    'numberOfOverdueDays1to6month',
    'HistoryResponse.TableHeaders.NumberOfOverdueDays1to6month',
    'string',
    'numberOfOverdueDays1to6month'
  ),
  new TableDataHeader(
    'numberOfCasesOfDelay1to24month',
    'HistoryResponse.TableHeaders.NumberOfCasesOfDelay1to24month',
    'string',
    'numberOfCasesOfDelay1to24month'
  ),
  new TableDataHeader(
    'numberOfOverdueDays25to36month',
    'HistoryResponse.TableHeaders.NumberOfOverdueDays25to36month',
    'string',
    'numberOfOverdueDays25to36month'
  ),
  new TableDataHeader(
    'maxNumberOfOverdueDays1to2month',
    'HistoryResponse.TableHeaders.MaxNumberOfOverdueDays1to2month',
    'string',
    'maxNumberOfOverdueDays1to2month'
  ),
  new TableDataHeader(
    'maxNumberOfOverdueDays1to6month',
    'HistoryResponse.TableHeaders.MaxNumberOfOverdueDays1to6month',
    'string',
    'maxNumberOfOverdueDays1to6month'
  ),
  new TableDataHeader(
    'maxNumberOfOverdueDays1to12month',
    'HistoryResponse.TableHeaders.MaxNumberOfOverdueDays1to12month',
    'string',
    'maxNumberOfOverdueDays1to12month'
  ),
  new TableDataHeader(
    'maxNumberOfOverdueDays13to24month',
    'HistoryResponse.TableHeaders.MaxNumberOfOverdueDays13to24month',
    'string',
    'maxNumberOfOverdueDays13to24month'
  ),
  new TableDataHeader(
    'maxNumberOfOverdueDays25to36month',
    'HistoryResponse.TableHeaders.MaxNumberOfOverdueDays25to36month',
    'string',
    'maxNumberOfOverdueDays25to36month'
  ),
  new TableDataHeader(
    'monthlyLoanPayment',
    'HistoryResponse.TableHeaders.MonthlyLoanPayment',
    'string',
    'monthlyLoanPayment'
  )
];

export const OTHER_BANKS_REQUEST_PROPS: TableDataHeader[] = [
  new TableDataHeader('bankName', 'HistoryResponse.TableHeaders.OrganizationName', 'string', 'bankName'),
  new TableDataHeader('requestDate', 'HistoryResponse.TableHeaders.RequestDate', 'date', 'requestDate'),
  new TableDataHeader(
    'requestObjective',
    'HistoryResponse.TableHeaders.RequestObjective',
    'string',
    'requestObjective'
  ),
  new TableDataHeader('scopeOfUse', 'HistoryResponse.TableHeaders.UseScope', 'string', 'scopeOfUse'),
  new TableDataHeader('requestType', 'HistoryResponse.TableHeaders.RequestType', 'string', 'requestType'),
  new TableDataHeader(
    'loanReceived',
    'HistoryResponse.TableHeaders.CreditReceivedResultOfRequest',
    'status',
    'loanReceived'
  )
];
