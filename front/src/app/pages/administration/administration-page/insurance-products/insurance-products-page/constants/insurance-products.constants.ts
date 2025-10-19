import { TableDataHeader } from '@app/_models';

export const INSURANCE_PRODUCTS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('productAbsCode', 'Administration.TableHeaders.InsuranceProducts.ProductAbsCode', 'string'),
  new TableDataHeader('dirInsuranceType.nameRu', 'Administration.TableHeaders.InsuranceProducts.TypeAbsCode', 'ru'),
  new TableDataHeader('dirInsuranceType.nameAm', 'Administration.TableHeaders.InsuranceProducts.TypeAbsCode', 'am'),
  new TableDataHeader('dirInsuranceType.nameEn', 'Administration.TableHeaders.InsuranceProducts.TypeAbsCode', 'en'),
  new TableDataHeader('companyAbsCode', 'Administration.TableHeaders.InsuranceProducts.CompanyAbsCode', 'number'),
  new TableDataHeader('companyName', 'Administration.TableHeaders.InsuranceProducts.CompanyName', 'string'),
  new TableDataHeader('insuranceProductAbsCode', 'Administration.TableHeaders.InsuranceProducts.AbsCode', 'string'),
  new TableDataHeader('rateFrom', 'Administration.TableHeaders.InsuranceProducts.RateFrom', 'number'),
  new TableDataHeader('rateTo', 'Administration.TableHeaders.InsuranceProducts.RateTo', 'number')
];
