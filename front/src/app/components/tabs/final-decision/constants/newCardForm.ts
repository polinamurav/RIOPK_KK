import { EditableTableHeader, EInputType } from '@app/_models';

export interface ICardTermOption {
  id: number;
  name: string;
  value: number;
}

export enum EFieldGroup {
  Card = 'card',
  Account = 'account'
}

export interface INewCardField {
  code: string;
  type: string;
  placeholder: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  disabled: boolean;
  readonly?: boolean;
  optionsListName?: string;
  group?: string;
}

export const NEW_CARD_FORM: INewCardField[] = [
  {
    code: 'isNewCardOrder',
    type: EInputType.Checkbox,
    placeholder: 'Заказать новую карту',
    required: false,
    disabled: false,
    group: EFieldGroup.Card
  },
  {
    code: 'dirPaymentCardId',
    type: EInputType.Select,
    placeholder: 'Тип платежной карты',
    required: true,
    disabled: false,
    optionsListName: 'cardTypeOptions'
  },
  {
    code: 'cardTerm',
    type: EInputType.Select,
    placeholder: 'Срок карты, мес',
    required: true,
    disabled: false,
    optionsListName: 'cardTermOptions'
  },
  {
    code: 'codeword',
    type: EInputType.Text,
    placeholder: 'Кодовое слово',
    required: true,
    disabled: false,
    minLength: 3,
    maxLength: 50
  },
  {
    code: 'nameOnCard',
    type: EInputType.Text,
    placeholder: 'Имя на карте',
    required: true,
    disabled: false,
    maxLength: 21
  },
  {
    code: 'surnameOnCard',
    type: EInputType.Text,
    placeholder: 'Фамилия на карте',
    required: true,
    disabled: false,
    maxLength: 21
  },
  {
    code: 'cardNumber',
    type: EInputType.Text,
    placeholder: 'Номер карты',
    pattern: /^[0-9]\d*$/,
    maxLength: 16,
    required: true,
    disabled: false
  },
  // don`t remove it
  // {
  //   code: 'isPinSet',
  //   type: EInputType.Checkbox,
  //   placeholder: '',
  //   required: '',
  //   disabled: false,
  // },
  {
    code: 'isUrgentCard',
    type: EInputType.Checkbox,
    placeholder: 'Срочность заказа карты',
    required: false,
    disabled: false
  },

  {
    code: 'isNewAccOrder',
    type: EInputType.Checkbox,
    placeholder: 'Открыть новый счет',
    required: false,
    disabled: false,
    group: EFieldGroup.Account
  },
  {
    code: 'accNum',
    type: EInputType.Text,
    placeholder: 'Номер счета',
    required: false,
    disabled: false,
    readonly: true,
    group: EFieldGroup.Account
  }
];

export interface ICardNameKeyValue {
  formField: string;
  formValue: string;
}

export enum AznLetters {
  A = 'A',
  B = 'B',
  C = 'J',
  Ç = 'CH',
  D = 'D',
  E = 'E',
  Ə = 'A',
  F = 'F',
  G = 'G',
  Ğ = 'GH',
  H = 'H',
  X = 'KH',
  I = 'I',
  İ = 'I',
  J = 'ZH',
  K = 'K',
  Q = 'G',
  L = 'L',
  M = 'M',
  N = 'N',
  O = 'O',
  Ö = 'O',
  P = 'P',
  R = 'R',
  S = 'S',
  Ş = 'SH',
  T = 'T',
  U = 'U',
  Ü = 'U',
  V = 'V',
  Y = 'Y',
  Z = 'Z'
}

export const GOODS_HEADERS: EditableTableHeader[] = [
  {
    code: 'price',
    value: 'Стоимость, GEL',
    type: 'string',
    isRequired: false,
    size: 'medium',
    maxLength: 13,
    pattern: /^[0-9]\d*$/
  },
  {
    code: 'description',
    value: 'Описание товара',
    type: 'string',
    isRequired: false,
    size: 'medium',
    maxLength: 255
  }
];
