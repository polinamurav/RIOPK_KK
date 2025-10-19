import { BaseFormField, EInputType, OptionListNames, ValueType } from '@app/_models';

export const CORP_COMPANY_FORM: BaseFormField[] = [
  {
    code: 'inn',
    propertyName: 'inn',
    type: EInputType.Select,
    placeholder: 'FullForm.TableHeaders.INN',
    required: false,
    disabled: false,
    readonly: false,
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'corp',
    type: EInputType.Select,
    placeholder: 'FullForm.TableHeaders.CompanyName',
    required: false,
    disabled: false,
    readonly: false,
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'code',
    propertyName: 'code',
    type: EInputType.Select,
    placeholder: 'FullForm.TableHeaders.CompanyCode',
    required: false,
    disabled: false,
    readonly: false,
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'segment',
    propertyName: 'segment',
    type: EInputType.Select,
    placeholder: 'FullForm.TableHeaders.CompanySegment',
    required: false,
    disabled: true,
    readonly: true,
    selectEmittedValueType: ValueType.Object
  }
];
