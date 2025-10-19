import { CustomOptionList, EInputType, TableDataHeader, ValueType } from '@app/_models';

import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const COMMISSION_CONFIG_HEADERS: TableDataHeader[] = [
  new TableDataHeader(
    'absCommission.id',
    'Administration.TableHeaders.Commission.CommissionCode',
    'string',
    'absCommission.id'
  ),
  new TableDataHeader('product.nameRu', 'Administration.TableHeaders.Product', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'Administration.TableHeaders.Product', 'am', 'product.nameAm'),
  new TableDataHeader(
    'insuranceType.nameRu',
    'Administration.TableHeaders.InsuranceParams.InsuranceType',
    'ru',
    'insuranceType.nameRu'
  ),
  new TableDataHeader(
    'insuranceType.nameAm',
    'Administration.TableHeaders.InsuranceParams.InsuranceType',
    'am',
    'insuranceType.nameAm'
  ),
  new TableDataHeader(
    'insuranceCompany.name',
    'Administration.TableHeaders.InsuranceParams.InsuranceCompany',
    'string',
    'insuranceCompany.name'
  ),
  new TableDataHeader(
    'commissionExists',
    'Administration.TableHeaders.Commission.CommissionExists',
    'string',
    'commissionExists'
  ),
  new TableDataHeader('active', 'Administration.TableHeaders.Active', 'status', 'active')
];

export const commissionExistsOptions: CustomOptionList[] = [
  { id: 1, name: '0', value: 0 },
  { id: 2, name: '1', value: 1 }
];

export const COMMISSION_CONFIG_FORM: AdmBaseModalFormField[] = [
  {
    code: 'absCommission',
    type: EInputType.Select,
    placeholder: 'Administration.TableHeaders.Commission.CommissionCode',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'commission',
    propertyName: 'id',
    selectEmittedValueType: ValueType.Object,
    class: 'col-6'
  },
  {
    code: 'product',
    type: EInputType.Select,
    placeholder: 'Administration.TableHeaders.Product',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'productCategory',
    selectEmittedValueType: ValueType.Object,
    class: 'col-6'
  },
  {
    code: 'insuranceType',
    type: EInputType.Select,
    placeholder: 'Administration.TableHeaders.InsuranceParams.InsuranceType',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'insuranceType',
    selectEmittedValueType: ValueType.Object,
    class: 'col-6'
  },
  {
    code: 'insuranceCompany',
    type: EInputType.Select,
    placeholder: 'Administration.TableHeaders.InsuranceParams.InsuranceCompany',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'insuranceCompany',
    propertyName: 'name',
    selectEmittedValueType: ValueType.Object,
    class: 'col-6'
  },
  {
    code: 'commissionExists',
    type: EInputType.CustomSelect,
    placeholder: 'Administration.TableHeaders.Commission.CommissionExists',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'commissionExists',
    customListValueName: 'value',
    propertyName: 'name',
    class: 'col-6'
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Administration.TableHeaders.Active',
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-12'
  }
];
