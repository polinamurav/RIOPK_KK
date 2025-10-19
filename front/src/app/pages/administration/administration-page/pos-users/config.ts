import { EInputType, RoleAuthority, TableDataHeader, ValueType } from '@app/_models';
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';
import { InputErrorKeys } from '@app/constants/validators-errors';
import { Validators } from '@angular/forms';
import { identityCardPinValidator } from '@app/validators/identityCardPinValidator';
import { validateByPattern } from '@app/validators/validation-by-pattern';
import { PHONE_CODE_OPERATORS_PATTERN } from '@app/constants/phone-code';

export const USERS_POS_HEADERS: TableDataHeader[] = [
  // new TableDataHeader(
  //   'index',
  //   'Номер',
  //   'wholeNumber',
  //   'index'
  // ),
  new TableDataHeader(
    'username',
    'Логин',
    'string',
    'username'
  ),
  new TableDataHeader(
    'fio',
    'ФИО',
    'string',
    'fio'
  ),
  new TableDataHeader(
    'pin',
    'Номер документа',
    'string',
    'pin'
  ),
  new TableDataHeader(
    'mobilePhone',
    'Номер телефона',
    'string',
    'mobilePhone'
  ),
  new TableDataHeader(
    'roles',
    'Роль',
    'string',
    'roles'
  ),
  new TableDataHeader(
    'created',
    'Дата создания',
    'date',
    'created'
  ),
  new TableDataHeader(
    'changedByUsername',
    'Кем изменено',
    'string',
    'changedByUsername'
  ),
  new TableDataHeader(
    'updated',
    'Дата изменения',
    'date',
    'updated'
  ),

  new TableDataHeader(
    'tradingPoints',
    'Торговая точка',
    'string',
    'tradingPoints'
  ),
  new TableDataHeader(
    'active',
    'Статус',
    'status',
    'active'
  ),
  new TableDataHeader(
    'accessESign',
    'Е-sign доступ',
    'status',
    'accessESign'
  ),
];

export const USERS_POS_FORM: AdmBaseModalFormField[] = [
  {
    code: 'username',
    type: EInputType.Text,
    placeholder: 'Логин',
    required: true,
    disabled: false,
    readonly: false,
    uniqTextValidation: true,
    uniqTextValidationErrorMessage: 'Пользователь с таким логином уже существует',
    optionsListName: 'userNames',
    validatorsFns: [validateByPattern('^(?=.*[A-Za-z])[A-Za-z\\d!?.@#$%^&*=+_-]{4,20}$', InputErrorKeys.EmailIncorrect)],
    maxLength: 20,
    minLength: 4,
  },
  {
    code: 'firstName',
    type: EInputType.Text,
    placeholder: 'Имя',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255
  },

  {
    code: 'lastName',
    type: EInputType.Text,
    placeholder: 'Фамилия',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255
  },
  {
    code: 'patronymic',
    type: EInputType.Text,
    placeholder: 'Отчество',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 255
  },
  {
    code: 'pin',
    type: EInputType.Text,
    placeholder: 'Номер документа',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 9,
    minLength: 9,
    validatorsFns: [Validators.required, identityCardPinValidator(), Validators.minLength(9), Validators.maxLength(9)]
  },
  {
    code: 'mobilePhone',
    type: EInputType.PhoneNumber,
    placeholder: 'Номер телефона',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 25,
    validatorsFns: [validateByPattern(PHONE_CODE_OPERATORS_PATTERN, InputErrorKeys.PhoneCodeFormat),
    ],
    customValidators: [
      {
        errorKey: InputErrorKeys.IncorrectData8,
        pattern: '^[0-9]{8}$'
      }
    ],
  },
  {
    code: 'email',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.Email',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 100,
    customValidators: [
      {
        errorKey: InputErrorKeys.EmailIncorrect,
        pattern: '^[a-zA-Z0-9_+-]([.a-zA-Z0-9_+-]*[a-zA-Z0-9_+-])?@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'
      }
    ],
  },
  // {
  //   code: 'active',
  //   type: EInputType.Checkbox,
  //   placeholder: 'Активная запись',
  //   required: false,
  //   disabled: false,
  //   readonly: false,
  //   maxLength: 255
  // },
  {
    code: 'accessESign',
    type: EInputType.Checkbox,
    placeholder: 'OTP подписание документов',
    required: false,
    disabled: false,
    readonly: false,
    editableForRolesList:  [RoleAuthority.ADMIN, RoleAuthority.HEAD_POS, RoleAuthority.REG_MANAGER_POS],
    maxLength: 255
  },
  {
    code: 'authorities',
    type: EInputType.ListForSelect,
    placeholder: 'Роли',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'roles',
    selectEmittedValueType: ValueType.Object,
    validatorsFns: [Validators.required]
  },
  {
    code: 'points',
    type: EInputType.ListForSelect,
    placeholder: 'Торговая точка',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'points',
    roleFieldName: 'authorities',
    requiredByRole: (roleId: string) => {
      return ![RoleAuthority.HEAD_POS, RoleAuthority.REG_MANAGER_POS, RoleAuthority.ADMIN].includes(roleId as any)
    },
    selectEmittedValueType: ValueType.Object,

  },

];
