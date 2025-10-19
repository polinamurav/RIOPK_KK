import { BaseFormField, EInputType, OptionListNames } from '@app/_models';

import { InputErrorKeys } from '@app/constants/validators-errors';

const BASE_ADD_COMPANY_CONFIG: BaseFormField[] = [
  {
    code: 'id',
    type: EInputType.Text,
    placeholder: 'Modals.Placeholder.Inn',
    required: true,
    disabled: false,
    readonly: false,
    minLength: 9,
    maxLength: 11,
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: '^[0-9]+$'
      }
    ],
    class: 'col-12'
  },
  {
    code: 'name',
    type: EInputType.Text,
    placeholder: 'Modals.Placeholder.CompanyName',
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-12'
  }
];

const COMPANY_STATUS_CONTROL = {
  code: 'companyStatusId',
  type: EInputType.Select,
  placeholder: 'Modals.Placeholder.CompanyStatus',
  required: true,
  disabled: false,
  readonly: false,
  optionsListName: OptionListNames.CompanyStatus,
  class: 'col-12'
};

const COMPANY_STATUS_CONTROL_DISABLED = {
  code: 'companyStatusId',
  type: EInputType.Select,
  placeholder: 'Modals.Placeholder.CompanyStatus',
  required: false,
  disabled: true,
  readonly: true,
  optionsListName: OptionListNames.CompanyStatus,
  class: 'col-12'
};

export const ADD_COMPANY_FULL_FORM: BaseFormField[] = [...BASE_ADD_COMPANY_CONFIG, COMPANY_STATUS_CONTROL_DISABLED];

export const ADD_COMPANY_DECISION_MAKING: BaseFormField[] = [...BASE_ADD_COMPANY_CONFIG, COMPANY_STATUS_CONTROL];
