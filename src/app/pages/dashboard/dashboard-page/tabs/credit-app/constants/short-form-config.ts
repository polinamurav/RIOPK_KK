import { BaseFormField, EInputType, OptionListNames } from '@app/_models';

import { InputErrorKeys } from '@app/constants/validators-errors';

const amountValidationLimit: number = 99999999.99;
const amountValidationMin: number = 1;

export const FORM_SUB_TITLES = {
  productId: 'ShortForm.Credit',
  firstName: 'ShortForm.Borrower'
};

export function getFormFieldByName(name: string): BaseFormField {
  const formField: BaseFormField = SHORT_FORM.find((field: BaseFormField) => field.code === name);
  return formField || null;
}

export const SHORT_FORM: BaseFormField[] = [
  {
    code: 'productId',
    type: EInputType.Select,
    placeholder: 'ShortForm.ProductType',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.Product,
    class: 'col-12'
  },
  {
    code: 'creditAmount',
    type: EInputType.Text,
    placeholder: 'ShortForm.CreditAmount',
    required: true,
    disabled: false,
    readonly: false,
    min: amountValidationMin,
    customValidators: [
      {
        errorKey: InputErrorKeys.Double,
        pattern: '^(?!$)\\d{0,8}(?:\\.\\d{1,2})?$'
      }
    ],
    class: 'col-12'
  },
  {
    code: 'creditTerm',
    type: EInputType.Text,
    placeholder: 'ShortForm.CreditTerm',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 3,
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: '^[0-9]+$'
      }
    ],
    min: amountValidationMin,
    class: 'col-12'
  },
  {
    code: 'firstName',
    type: EInputType.Text,
    placeholder: 'ShortForm.FirstName',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-12'
  },
  {
    code: 'lastName',
    type: EInputType.Text,
    placeholder: 'ShortForm.LastName',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-12'
  },
  {
    code: 'pin',
    type: EInputType.Text,
    placeholder: 'ShortForm.PinCode',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 11,
    minLength: 11,
    customValidators: [
      {
        errorKey: InputErrorKeys.PinIncorrect,
        pattern: '^[0-9]+$'
      }
    ],
    class: 'col-12'
  },
  {
    code: 'birthDate',
    type: EInputType.Date,
    placeholder: 'ShortForm.BirthDate',
    maxDate: new Date(),
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'mobilePhone',
    type: EInputType.PhoneNumber,
    placeholder: 'ShortForm.Phone',
    required: true,
    disabled: false,
    readonly: false,
    minLength: 9,
    class: 'col-12'
  },
  {
    code: 'income',
    type: EInputType.Text,
    placeholder: 'ShortForm.Income',
    required: true,
    disabled: false,
    readonly: false,
    min: amountValidationMin,
    customValidators: [
      {
        errorKey: InputErrorKeys.Double,
        pattern: '^(?!$)\\d{0,8}(?:\\.\\d{1,2})?$'
      }
    ],
    class: 'col-12'
  },
  {
    code: 'email',
    type: EInputType.Text,
    placeholder: 'ShortForm.Email',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255,
    customValidators: [
      {
        errorKey: InputErrorKeys.EmailIncorrect,
        pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'
      }
    ],
    class: 'col-12'
  },
  {
    code: 'language',
    type: EInputType.Select,
    placeholder: 'ShortForm.Language',
    required: true,
    disabled: false,
    readonly: false,
    propertyName: 'name',
    optionsListName: OptionListNames.Languages,
    class: 'col-6'
  },
  {
    code: 'branchId',
    type: EInputType.Select,
    placeholder: 'ShortForm.Branch',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.Branches,
    class: 'col-6'
  }
];
