import { TableDataHeader } from '@app/_models';

export const EMPLOYMENT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('Period', 'Employment.TableHeaders.AccrualPeriod', 'string', 'Period'),
  new TableDataHeader('Employer_Name', 'Employment.TableHeaders.OrganizationName', 'string', 'Employer_Name'),
  new TableDataHeader('Employer_Tin', 'Employment.TableHeaders.OrganizationTIN', 'string', 'Employer_Tin'),
  new TableDataHeader('Income_Type', 'Employment.TableHeaders.TypeOfIncome', 'string', 'Income_Type'),
  new TableDataHeader(
    'Taxable_Total_Income',
    'Employment.TableHeaders.TaxableIncome',
    'number',
    'Taxable_Total_Income'
  ),
  new TableDataHeader('Income', 'Employment.TableHeaders.Income', 'number', 'Income')
];
