import { TableDataHeader } from '@app/_models';

// * Сведения о доходах НОРК
export const EXPERIENCE_INFO_PROPS: TableDataHeader[] = [
  new TableDataHeader('inn', 'Employment.TableHeaders.Inn', 'string', 'inn'),
  new TableDataHeader('name', 'Employment.TableHeaders.OrganizationName', 'string', 'name'),
  new TableDataHeader('continuousLos', 'Employment.Placeholders.CurrentExperience', 'string', 'continuousLos')
];

// * Сведения о доходах НОРК
export const NORK_INCOME_INFO_PROPS: TableDataHeader[] = [
  new TableDataHeader('hvhh', 'Employment.TableHeaders.Inn', 'string', 'hvhh'),
  new TableDataHeader('workName', 'Employment.TableHeaders.OrganizationName', 'string', 'workName'),
  new TableDataHeader('entryDate', 'Employment.TableHeaders.DateOfEmployment', 'date', 'entryDate'),
  new TableDataHeader('expiryDate', 'Employment.TableHeaders.DateOfDismissalFromWork', 'date', 'expiryDate'),
  new TableDataHeader('pashton', 'Employment.TableHeaders.Position', 'string', 'pashton'),
  new TableDataHeader('salary', 'Employment.TableHeaders.AverageMonthlySalary', 'string', 'salary'),
  new TableDataHeader('avum', 'Employment.TableHeaders.TotalLaborForPeriod', 'string', 'avum'),
  new TableDataHeader('socvjar', 'Employment.TableHeaders.TotalSocialBenefits', 'string', 'socvjar'),
  new TableDataHeader('pajmanData', 'Employment.TableHeaders.AgreementDate', 'date', 'pajmanData')
  // new TableDataHeader(
  //   'inBlacklist',
  //   'Employment.TableHeaders.BlacklistedForEmployer',
  //   'status',
  //   'inBlacklist'
  // )
];

// * Сведения о доходах ЭКЕНГ (ПЭГ)
export const EKENG_INCOME_INFO_PROPS: TableDataHeader[] = [
  new TableDataHeader('taxPayerId', 'Employment.TableHeaders.Inn', 'string', 'taxPayerId'),
  new TableDataHeader(
    'date',
    'Employment.TableHeaders.MonthOfSalaryAccrual',
    'date',
    'date' //
  ),
  new TableDataHeader('salaryEquivPayments', 'Employment.TableHeaders.Salary', 'string', 'salaryEquivPayments'),
  new TableDataHeader(
    'civilLowContractPayments',
    'Employment.TableHeaders.SalaryUnderCivilContract',
    'string',
    'civilLowContractPayments'
  ),
  new TableDataHeader('incomeTax', 'Employment.TableHeaders.IncomeTax', 'string', 'incomeTax'),
  new TableDataHeader('socialPayments', 'Employment.TableHeaders.SocialPayment', 'string', 'socialPayments'),
  new TableDataHeader(
    'socialPaymentsPaid',
    'Employment.TableHeaders.TransferredSocialPayment',
    'string',
    'socialPaymentsPaid'
  ),
  new TableDataHeader('workingHours', 'Employment.TableHeaders.NumberOfHoursWorked', 'string', 'workingHours')
];

// * Сведения о зарплатных поступлениях в банке
export const SALARY_RECEIPTS_IN_BANK_INFO_PROPS: TableDataHeader[] = [
  new TableDataHeader('formatteddate', 'Employment.TableHeaders.MonthOfReceipts', 'string', 'formatteddate'),
  new TableDataHeader('fullCormName', 'Employment.TableHeaders.EnumeratingPerson', 'string', 'fullCormName'),
  new TableDataHeader('profile', 'Employment.TableHeaders.CardProfile', 'string', 'profile'),
  new TableDataHeader('doctype', 'Documents.TableHeaders.DocumentType', 'string', 'doctype'),
  new TableDataHeader('currency', 'TableHeader.Currency', 'string', 'currency'),
  new TableDataHeader('count', 'Employment.TableHeaders.NumberOfReceipts', 'string', 'count'),
  new TableDataHeader('sum', 'Employment.TableHeaders.AmountOfReceipts', 'string', 'sum')
];
