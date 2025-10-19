import { BaseFormField, EInputType, OptionListNames } from '@app/_models';
import { InputErrorKeys } from '@app/constants/validators-errors';

export const ENTER_PERS_DATA_FORM: BaseFormField[] = [
  {
    code: 'identityCardTypeId',
    type: EInputType.Select,
    placeholder: 'ShortForm.IdentityCardType',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    optionsListName: OptionListNames.IdentityCardType,
    class: 'col-6',
    allowEmptyValue: false
  },
  {
    code: 'pin',
    type: EInputType.Text,
    placeholder: 'ShortForm.Document',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    minLength: 9,
    maxLength: 9,
    pattern: /^[A-Z]{2}\d{7}$/,
    class: 'col-6'
  },
  {
    code: 'socCardTypeId',
    type: EInputType.Select,
    placeholder: 'ShortForm.SocialCardType',
    required: false,
    disabled: false,
    readonly: false,
    isVisible: true,
    optionsListName: OptionListNames.SocialCardType,
    class: 'col-6',
    allowEmptyValue: true
  },
  {
    code: 'socCardPin',
    type: EInputType.Text,
    placeholder: 'ShortForm.SocialCardNumber',
    required: false,
    disabled: false,
    readonly: false,
    isVisible: true,
    emitEvent: false,
    class: 'col-6'
  },
  {
    code: 'lastName',
    type: EInputType.Text,
    placeholder: 'ShortForm.LastName',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    maxLength: 255,
    class: 'col-6',
    pattern: /^([а-яёa-zա-ֆ\-\s]+|)$/i
  },
  {
    code: 'firstName',
    type: EInputType.Text,
    placeholder: 'ShortForm.FirstName',
    labelPosition: 'after',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    maxLength: 255,
    class: 'col-6',
    pattern: /^([а-яёa-zա-ֆ\-\s]+|)$/i
  },

  {
    code: 'birthDate',
    type: EInputType.Date,
    placeholder: 'ShortForm.BirthDate',
    required: true,
    disabled: false,
    maxDate: new Date(),
    readonly: false,
    isVisible: true,
    class: 'col-6'
  },
  {
    code: 'genderId',
    type: EInputType.Select,
    placeholder: 'FullForm.Placeholder.Gender',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    optionsListName: OptionListNames.Gender,
    class: 'col-6',
    allowEmptyValue: true
  }
];
