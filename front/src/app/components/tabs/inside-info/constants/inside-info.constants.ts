import { TableDataHeader } from '@app/_models';
// * связанные лица
export const RELATED_PERSONS: TableDataHeader[] = [
  new TableDataHeader('clientCodeABS', 'InsideInfo.TableHeaders.ClientNo', 'string', 'clientCodeABS'),
  new TableDataHeader(
    'fullNameOfRelatedPerson',
    'InsideInfo.TableHeaders.RelClientName',
    'string',
    'fullNameOfRelatedPerson'
  ),
  new TableDataHeader('communicationType', 'InsideInfo.TableHeaders.ClientRelationType', 'string', 'communicationType'),
  new TableDataHeader(
    'balanceOfLoansInBank',
    'InsideInfo.TableHeaders.OutstandingAmount',
    'string',
    'balanceOfLoansInBank'
  )
];

// * наихудший класс риска
export const INTERNAL_LOAN_HISTORY: TableDataHeader[] = [
  new TableDataHeader(
    'maxWorstClass.absName',
    'InsideInfo.TableHeaders.InquiriesEntirePeriod',
    'ru',
    'maxWorstClass.absName'
  ),
  new TableDataHeader(
    'maxWorstClass.acraCode',
    'InsideInfo.TableHeaders.InquiriesEntirePeriod',
    'am',
    'maxWorstClass.acraCode'
  ),
  new TableDataHeader(
    'maxWorstClass1_12.absName',
    'InsideInfo.TableHeaders.Inquiries1To12month',
    'ru',
    'maxWorstClass1_12.absName'
  ),
  new TableDataHeader(
    'maxWorstClass1_12.acraCode',
    'InsideInfo.TableHeaders.Inquiries1To12month',
    'am',
    'maxWorstClass1_12.acraCode'
  ),
  new TableDataHeader(
    'maxWorstClass13_24.absName',
    'InsideInfo.TableHeaders.Inquiries13To24month',
    'ru',
    'maxWorstClass13_24.absName'
  ),
  new TableDataHeader(
    'maxWorstClass13_24.acraCode',
    'InsideInfo.TableHeaders.Inquiries13To24month',
    'am',
    'maxWorstClass13_24.acraCode'
  ),
  new TableDataHeader(
    'maxWorstClassOpen.absName',
    'InsideInfo.TableHeaders.InquiriesOnCurrentLoans',
    'ru',
    'maxWorstClassOpen.absName'
  ),
  new TableDataHeader(
    'maxWorstClassOpen.acraCode',
    'InsideInfo.TableHeaders.InquiriesOnCurrentLoans',
    'am',
    'maxWorstClassOpen.acraCode'
  ),
  new TableDataHeader(
    'maxWorstClassClose.absName',
    'InsideInfo.TableHeaders.InquiriesOnRepaidLoans',
    'ru',
    'maxWorstClassClose.absName'
  ),
  new TableDataHeader(
    'maxWorstClassClose.acraCode',
    'InsideInfo.TableHeaders.InquiriesOnRepaidLoans',
    'am',
    'maxWorstClassClose.acraCode'
  ),

  new TableDataHeader(
    'maxWorstClassClose1_24.absName',
    'InsideInfo.TableHeaders.InquiriesOnRepaidLoans12To24month',
    'ru',
    'maxWorstClassClose1_24.absName'
  ),
  new TableDataHeader(
    'maxWorstClassClose1_24.acraCode',
    'InsideInfo.TableHeaders.InquiriesOnRepaidLoans12To24month',
    'am',
    'maxWorstClassClose1_24.acraCode'
  ),
  new TableDataHeader(
    'maxWorstClassGuarantee.absName',
    'InsideInfo.TableHeaders.WorstRiskClassOnSureties',
    'ru',
    'maxWorstClassGuarantee.absName'
  ),
  new TableDataHeader(
    'maxWorstClassGuarantee.acraCode',
    'InsideInfo.TableHeaders.WorstRiskClassOnSureties',
    'am',
    'maxWorstClassGuarantee.acraCode'
  ),
  new TableDataHeader(
    'sumNumberOfLoanClassReviews',
    'InsideInfo.TableHeaders.NumberOfLoanRiskClassReviews',
    'string',
    'sumNumberOfLoanClassReviews'
  )
];

// * просрочки
export const OVERDUE_PROPS: TableDataHeader[] = [
  new TableDataHeader(
    'sumDaysOfDelayedPayments',
    'InsideInfo.TableHeaders.DaysOfDelayedPayments',
    'string',
    'sumDaysOfDelayedPayments'
  ),
  new TableDataHeader(
    'sumNumberOfOverdueDays1_12',
    'InsideInfo.TableHeaders.NumberOfOverdueDays1to12month',
    'string',
    'sumNumberOfOverdueDays1_12'
  ),
  new TableDataHeader(
    'sumNumberOfOverdueDays13_24',
    'InsideInfo.TableHeaders.NumberOfOverdueDays13to24month',
    'string',
    'sumNumberOfOverdueDays13_24'
  ),
  new TableDataHeader(
    'sumNumberOfCasesOfDelay',
    'InsideInfo.TableHeaders.NumberOfCasesOfDelay',
    'string',
    'sumNumberOfCasesOfDelay'
  )
];

// * обязательства
export const OBLIGATIONS_PROPS: TableDataHeader[] = [
  new TableDataHeader('isCreditLine', 'InsideInfo.TableHeaders.CreditLine', 'string', 'isCreditLine').setFilter({
    isBoolean: true
  }),
  new TableDataHeader('isKPZZ', 'InsideInfo.TableHeaders.KPZZ', 'string', 'isKPZZ').setFilter({ isBoolean: true }),
  new TableDataHeader('statusRu', 'InsideInfo.TableHeaders.Status', 'ru', 'statusRu').setFilter({
    filterProperty: 'status'
  }),
  new TableDataHeader('statusAm', 'InsideInfo.TableHeaders.Status', 'am', 'statusAm').setFilter({
    filterProperty: 'status'
  }),
  new TableDataHeader('amount', 'InsideInfo.TableHeaders.Amount', 'string', 'amount'),
  new TableDataHeader('currency', 'InsideInfo.TableHeaders.Currency', 'string', 'currency'),
  new TableDataHeader('agreementDate', 'InsideInfo.TableHeaders.IssueDate', 'date', 'agreementDate'),
  new TableDataHeader('maturityDate', 'InsideInfo.TableHeaders.MaturityDate', 'date', 'maturityDate'),
  new TableDataHeader('remainder', 'InsideInfo.TableHeaders.Remainder', 'string', 'remainder'),
  new TableDataHeader('overdueAmount', 'InsideInfo.TableHeaders.OverdueAmount', 'string', 'overdueAmount'),
  new TableDataHeader('overdueInterest', 'InsideInfo.TableHeaders.OverdueInterest', 'string', 'overdueInterest'),
  new TableDataHeader('interestRates', 'InsideInfo.TableHeaders.InterestRates', 'string', 'interestRates'),
  new TableDataHeader(
    'isPenaltiesAndFines',
    'InsideInfo.TableHeaders.IsPenaltiesAndFines',
    'string',
    'isPenaltiesAndFines'
  ),
  new TableDataHeader('creditSubclassAbsName', 'InsideInfo.TableHeaders.CreditSubclass', 'ru', 'creditSubclassAbsName'),
  new TableDataHeader('creditSubclassAm', 'InsideInfo.TableHeaders.CreditSubclass', 'am', 'creditSubclassAm'),
  new TableDataHeader(
    'dateOfLastRepayment',
    'InsideInfo.TableHeaders.DateOfLastRepayment',
    'date',
    'dateOfLastRepayment'
  ),
  new TableDataHeader('worstRiskClassAbsName', 'InsideInfo.TableHeaders.WorstRiskClass', 'ru', 'worstRiskClassAbsName'),
  new TableDataHeader('worstRiskClassAm', 'InsideInfo.TableHeaders.WorstRiskClass', 'am', 'worstRiskClassAm'),
  new TableDataHeader(
    'worstRiskClass1to12monthAbsName',
    'InsideInfo.TableHeaders.WorstRiskClass1to12month',
    'ru',
    'worstRiskClass1to12monthAbsName'
  ),
  new TableDataHeader(
    'worstRiskClass1to12monthAm',
    'InsideInfo.TableHeaders.WorstRiskClass1to12month',
    'am',
    'worstRiskClass1to12monthAm'
  ),
  new TableDataHeader(
    'worstRiskClass13to24monthAbsName',
    'InsideInfo.TableHeaders.WorstRiskClass13To24month',
    'ru',
    'worstRiskClass13to24monthAbsName'
  ),
  new TableDataHeader(
    'worstRiskClass13to24monthAm',
    'InsideInfo.TableHeaders.WorstRiskClass13To24month',
    'am',
    'worstRiskClass13to24monthAm'
  ),
  new TableDataHeader(
    'numberOfCasesOfDelay',
    'InsideInfo.TableHeaders.NumberOfCasesOfDelay',
    'string',
    'numberOfCasesOfDelay'
  ),
  new TableDataHeader(
    'daysOfDelayedPayments',
    'InsideInfo.TableHeaders.DaysOfDelayedPayments',
    'string',
    'daysOfDelayedPayments'
  ),
  new TableDataHeader(
    'numberOfOverdueDays1to12month',
    'InsideInfo.TableHeaders.NumberOfOverdueDays1to12month',
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
    'InsideInfo.TableHeaders.NumberOfOverdueDays1to24month',
    'string',
    'numberOfOverdueDays1to24month'
  ),
  new TableDataHeader(
    'numberOfLoanClassReviews',
    'InsideInfo.TableHeaders.NumberOfLoanClassReviews',
    'string',
    'numberOfLoanClassReviews',
    '',
    ''
  ).setFilter({ isBoolean: true, booleanValues: { yes: 'Buttons.Revised', no: 'Buttons.NotRevised' } }),

  new TableDataHeader(
    'numberOfLoanClassReviews1to36month',
    'InsideInfo.TableHeaders.NumberOfLoanClassReviews1to36month',
    'string',
    'numberOfLoanClassReviews1to36month'
  ),
  new TableDataHeader(
    'referenceInformation',
    'InsideInfo.TableHeaders.ReferenceInfo',
    'string',
    'referenceInformation'
  ),
  new TableDataHeader(
    'amountActuallyIssued',
    'InsideInfo.TableHeaders.AmountActuallyIssued',
    'string',
    'amountActuallyIssued'
  ),
  new TableDataHeader(
    'numberOfGuarantors',
    'InsideInfo.TableHeaders.NumberOfGuarantors',
    'string',
    'numberOfGuarantors'
  ),
  new TableDataHeader(
    'amountOfPledgeDeposit',
    'InsideInfo.TableHeaders.AmountOfDeposit', // Сумма Залога
    'string',
    'amountOfPledgeDeposit'
  ),
  new TableDataHeader('currencyOfPledge', 'InsideInfo.TableHeaders.CurrencyOfDeposit', 'string', 'currencyOfPledge'),
  new TableDataHeader('codeOfPledge', 'InsideInfo.TableHeaders.DepositCode', 'string', 'codeOfPledge'),
  new TableDataHeader('codeOfPledgeRu', 'InsideInfo.TableHeaders.Deposit', 'ru', 'codeOfPledgeRu'), // Код Залога
  new TableDataHeader('codeOfPledgeAm', 'InsideInfo.TableHeaders.Deposit', 'am', 'codeOfPledgeAm'), // Код Залога
  new TableDataHeader('collateralNotes', 'InsideInfo.TableHeaders.NotesAboutDeposit', 'string', 'collateralNotes'),
  new TableDataHeader('dirLiabilityTypeRu', 'InsideInfo.TableHeaders.TypeOfLoan', 'ru', 'dirLiabilityTypeRu').setFilter(
    { filterProperty: 'liabilityType' }
  ), // Вид Кредита
  new TableDataHeader('dirLiabilityTypeAm', 'InsideInfo.TableHeaders.TypeOfLoan', 'am', 'dirLiabilityTypeAm').setFilter(
    { filterProperty: 'liabilityType' }
  ), // Вид Кредита
  new TableDataHeader('fieldOfUseOfLoan', 'InsideInfo.TableHeaders.FieldOfUseOfLoan', 'string', 'fieldOfUseOfLoan'),
  new TableDataHeader(
    'codeOfFieldOfUseOfLoan',
    'InsideInfo.TableHeaders.codeOfFieldOfUseOfLoan',
    'string',
    'codeOfFieldOfUseOfLoan'
  ),
  new TableDataHeader(
    'overdueDaysOfGuarantor',
    'InsideInfo.TableHeaders.OverdueDaysOfGuarantor',
    'string',
    'overdueDaysOfGuarantor'
  ),
  new TableDataHeader(
    'worstCreditClass1to24monthAbsName',
    'InsideInfo.TableHeaders.WorstCreditClass1to24month',
    'ru',
    'worstCreditClass1to24monthAbsName'
  ),
  new TableDataHeader(
    'worstCreditClass1to24monthAm',
    'InsideInfo.TableHeaders.WorstCreditClass1to24month',
    'am',
    'worstCreditClass1to24monthAm'
  ),
  new TableDataHeader(
    'worstCreditClass25to36monthAbsName',
    'InsideInfo.TableHeaders.WorstCreditClass25to36month',
    'ru',
    'worstCreditClass25to36monthAbsName'
  ),
  new TableDataHeader(
    'worstCreditClass25to36monthAm',
    'InsideInfo.TableHeaders.WorstCreditClass25to36month',
    'am',
    'worstCreditClass25to36monthAm'
  ),
  new TableDataHeader(
    'numberOfOverdueDays1to2month',
    'InsideInfo.TableHeaders.NumberOfOverdueDays1to2month',
    'string',
    'numberOfOverdueDays1to2month'
  ),
  new TableDataHeader(
    'numberOfOverdueDays1to6month',
    'InsideInfo.TableHeaders.NumberOfOverdueDays1to6month',
    'string',
    'numberOfOverdueDays1to6month'
  ),
  new TableDataHeader(
    'maxNumberOfOverdueDays1to2month',
    'InsideInfo.TableHeaders.MaxNumberOfOverdueDays1to2month',
    'string',
    'maxNumberOfOverdueDays1to2month'
  ),
  new TableDataHeader(
    'maxNumberOfOverdueDays1to6month',
    'InsideInfo.TableHeaders.MaxNumberOfOverdueDays1to6month',
    'string',
    'maxNumberOfOverdueDays1to6month'
  ),
  new TableDataHeader(
    'maxNumberOfOverdueDays1to12month',
    'InsideInfo.TableHeaders.MaxNumberOfOverdueDays1to12month',
    'string',
    'maxNumberOfOverdueDays1to12month'
  ),
  new TableDataHeader(
    'maxNumberOfOverdueDays13to24month',
    'InsideInfo.TableHeaders.MaxNumberOfOverdueDays13to24month',
    'string',
    'maxNumberOfOverdueDays13to24month'
  ),
  new TableDataHeader(
    'maxNumberOfOverdueDays25to36month',
    'InsideInfo.TableHeaders.MaxNumberOfOverdueDays25to36month',
    'string',
    'maxNumberOfOverdueDays25to36month'
  ),
  new TableDataHeader(
    'numberOfOverdueDays25to36month1',
    'InsideInfo.TableHeaders.NumberOfOverdueDays25to36month',
    'string',
    'numberOfOverdueDays25to36month1'
  ),
  new TableDataHeader(
    'numberOfOverdueDays25to36month',
    'HistoryResponse.TableHeaders.NumberOfOverdueDays25to36month',
    'string',
    'numberOfOverdueDays25to36month'
  ),
  new TableDataHeader(
    'monthlyLoanPayment',
    'InsideInfo.TableHeaders.MonthlyLoanPayment',
    'string',
    'monthlyLoanPayment'
  ),
  new TableDataHeader(
    'numberOfCasesOfDelay1to24month', // TODO ROmanovski: add name when rest api is ready
    'InsideInfo.TableHeaders.NextPaymentnearestDate',
    'date',
    'numberOfCasesOfDelay1to24month' // TODO ROmanovski: add name when rest api is ready
  )
];

// * Параллельные заявки
export const PARALLEL_APPLICATIONS: TableDataHeader[] = [
  new TableDataHeader('applicationId', 'InsideInfo.TableHeaders.ApplicationCode', 'string', 'applicationId'),
  new TableDataHeader(
    'fullNameOfApplicant',
    'InsideInfo.TableHeaders.FullNameOfApplicant',
    'string',
    'fullNameOfApplicant'
  ),
  new TableDataHeader('applicationAmount', 'InsideInfo.TableHeaders.ApplicationAmount', 'string', 'applicationAmount'),
  new TableDataHeader(
    'applicationTypeLoanView.nameRu',
    'InsideInfo.TableHeaders.LoanType',
    'ru',
    'applicationTypeLoanView.nameRu'
  ),
  new TableDataHeader(
    'applicationTypeLoanView.nameAm',
    'InsideInfo.TableHeaders.LoanType',
    'am',
    'applicationTypeLoanView.nameAm'
  ),
  new TableDataHeader(
    'applicationTypeLoanView.nameEn',
    'InsideInfo.TableHeaders.LoanType',
    'en',
    'applicationTypeLoanView.nameEn'
  ),
  new TableDataHeader(
    'applicationDate', // TODO ROmanovski: add name when rest api is ready
    'InsideInfo.TableHeaders.ApplicationDateCreation',
    'date',
    'applicationDate' // TODO ROmanovski: add name when rest api is ready
  ),
  new TableDataHeader(
    'applicationStatusForView.nameRu',
    'InsideInfo.TableHeaders.ApplicationStatus',
    'ru',
    'applicationStatusForView.nameRu'
  ),
  new TableDataHeader(
    'applicationStatusForView.nameAm',
    'InsideInfo.TableHeaders.ApplicationStatus',
    'am',
    'applicationStatusForView.nameAm'
  ),
  new TableDataHeader(
    'applicationStatusForView.nameEn',
    'InsideInfo.TableHeaders.ApplicationStatus',
    'en',
    'applicationStatusForView.nameEn'
  )
];
