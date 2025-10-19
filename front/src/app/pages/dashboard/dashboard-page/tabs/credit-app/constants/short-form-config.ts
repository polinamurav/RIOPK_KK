import { BaseFormField, EInputType, OptionListNames, TableDataHeader } from '@app/_models';

import { InputErrorKeys } from '@app/constants/validators-errors';
import { ELanguage } from '@app/constants/language';

// const amountValidationLimit: number = 99999999.99;
const amountValidationMin: number = 1;

export const FORM_SUB_TITLES = {
  applicationType: 'ShortForm.Borrower',
  productId: 'ShortForm.Credit'
  // attachUDOFile: 'ShortForm.AttachUDOFile'
};

export const CONTROL_NAMES = {
  phone: 'phone',
  isClientVip: 'isClientVip',
  isClientMilitary: 'isClientMilitary',
  ignoreIncome: 'ignoreIncome',
  // isConsentExists: 'isConsentExists',
  agreement: 'agreement'
};

export function getFormFieldByName(name: string): BaseFormField {
  const formField: BaseFormField = SHORT_FORM.find((field: BaseFormField) => field.code === name);
  return formField || null;
}

export const PRE_APPROVED_OFFERS: TableDataHeader[] = [
  new TableDataHeader('product.nameRu', 'TableHeader.TypeOfLoan', 'ru', 'product.nameRu'),
  new TableDataHeader('product.nameAm', 'TableHeader.TypeOfLoan', 'am', 'product.nameAm'),
  new TableDataHeader('offerBase', 'TableHeader.OfferBase', 'string', 'offerBase'),
  new TableDataHeader('creditAmount', 'TableHeader.CreditAmount', 'string', 'creditAmount'),
  new TableDataHeader('currencyId', 'TableHeader.CurrencyAmount', 'string', 'currencyId'),
  new TableDataHeader('expirationDate', 'TableHeader.ExpirationDate', 'date', 'expirationDate')
];

export const SHORT_FORM: BaseFormField[] = [
  {
    code: 'applicationType',
    type: EInputType.Select,
    placeholder: 'ShortForm.ApplicationType',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    optionsListName: OptionListNames.ApplicationType,
    class: 'col-12',
    allowEmptyValue: false
  },
  {
    code: 'identityCardTypeId',
    type: EInputType.Select,
    placeholder: 'ShortForm.IdentityCardType',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    optionsListName: OptionListNames.IdentityCardType,
    class: 'col-12',
    allowEmptyValue: false
  },
  {
    code: 'identityCardPin',
    type: EInputType.Text,
    placeholder: 'ShortForm.Document',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    minLength: 9,
    maxLength: 9,
    // pattern: /^[A-Z]{2}\d{7}$/,
    class: 'col-12'
  },
  {
    code: 'socCardPin',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.SocialCardNumber', // Номер социальной карты
    required: false,
    disabled: false,
    readonly: false,
    isVisible: false,
    class: 'col-12',
    minLength: 10,
    maxLength: 10,
    // pattern: '^[0-9]{10}$',
    customValidators: [
      {
        errorKey: InputErrorKeys.IncorrectData8,
        pattern: '^[0-9]{10}$'
      }
    ],
    pattern: '^[0-9]*$'
    // specialCharacters: ['e', 'x', 't', ' ', '(', ')', '-', '.'],
  },
  {
    code: 'phone',
    type: EInputType.PhoneNumber,
    placeholder: 'ShortForm.PhoneNumber',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    class: 'col-12'
  },
  {
    code: 'email',
    type: EInputType.Text,
    placeholder: 'ShortForm.PhoneNumber',
    required: false,
    disabled: false,
    readonly: false,
    isVisible: false,
    class: 'col-12'
  },
  {
    code: 'isClientVip',
    type: EInputType.Checkbox,
    placeholder: 'ShortForm.VIPClient',
    required: false,
    disabled: true, // for prod
    readonly: false,
    isVisible: false,
    class: 'col-12'
  },
  {
    code: 'isClientMilitary',
    type: EInputType.Checkbox,
    placeholder: 'ShortForm.Military',
    required: false,
    disabled: false,
    readonly: false,
    isVisible: false,
    class: 'col-12'
  },
  {
    code: 'ignoreIncome',
    type: EInputType.Checkbox,
    placeholder: 'ShortForm.IgnoreIncome',
    required: false,
    disabled: true, // for prod
    readonly: false,
    isVisible: false,
    class: 'col-12'
  },
  {
    code: 'shortApplicationId',
    type: EInputType.Text,
    placeholder: 'ShortForm.IgnoreIncome',
    required: true,
    disabled: false, // for prod
    readonly: false,
    isVisible: false,
    class: 'col-12'
  },
  {
    code: 'isConsentExists',
    type: EInputType.Checkbox,
    placeholder: 'ShortForm.ConsentToEsign',
    required: false,
    disabled: true, // for prod
    readonly: false,
    isVisible: false,
    class: 'col-12'
  },
  {
    code: 'agreement',
    type: EInputType.Checkbox,
    placeholder: 'ShortForm.AgreementSigned',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: false,
    class: 'agreement-toggle'
  }
];

export const ApplicationTypeMap = {
  PRELIMINARY_REQUEST: {
    nameAm: 'Նախնական հարցում',
    nameRu: 'Предварительный запрос'
  },
  LOAN_APPLICATION: {
    nameAm: 'Վարկի հայտ',
    nameRu: 'Заявка на кредит'
  }
};

export enum applicationTypesEnum {
  PRELIMINARY_REQUEST = 'PRELIMINARY_REQUEST',
  LOAN_APPLICATION = 'LOAN_APPLICATION'
}
