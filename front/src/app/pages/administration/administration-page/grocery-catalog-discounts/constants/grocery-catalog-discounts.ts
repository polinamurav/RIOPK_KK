import { TableDataHeader } from '@app/_models';

export const PRODUCT_DISCOUNT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'Administration.TableHeaders.TypeLoan', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'Administration.TableHeaders.TypeLoan', 'am', 'product.nameAm'),
  new TableDataHeader('corpTariffId', 'Administration.Placeholders.Segment', 'string', 'corpTariffId'),
  new TableDataHeader(
    'rateTariffDiscount',
    'Administration.Placeholders.DiscountSegment',
    'string',
    'rateTariffDiscount'
  ),
  new TableDataHeader('rateBossDiscount', 'Administration.Placeholders.DiscountHead', 'string', 'rateBossDiscount'),
  new TableDataHeader(
    'rateSalaryDiscount',
    'Administration.Placeholders.DiscountVtbSalary',
    'string',
    'rateSalaryDiscount'
  ),
  new TableDataHeader(
    'rateAddServiceDiscountInsuranceAccident',
    'Administration.Placeholders.InsuranceBenefit',
    'string',
    'rateAddServiceDiscountInsuranceAccident'
  ),
  new TableDataHeader('active', 'TableHeader.Actively', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'TableHeader.ChangedByUsername', 'string', 'changedByUsername')
];
