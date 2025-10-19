import {EInputType, RoleAuthority, TableDataHeader, ValueType} from '@app/_models';
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';
import {validateByPattern} from "@app/validators/validation-by-pattern";
import {PHONE_CODE_OPERATORS_PATTERN} from "@app/constants/phone-code";
import {InputErrorKeys} from "@app/constants/validators-errors";

export const TRADING_COM_POINTS_HEADERS: TableDataHeader[] = [
  new TableDataHeader(
    'code',
    'Код',
    'string',
    'code'
  ),
  new TableDataHeader(
    'nameRu',
    'Точка торговой компании',
    'ru',
    'nameRu'
  ),
  new TableDataHeader(
    'nameAm',
    'Точка торговой компании',
    'am',
    'nameAm'
  ),
  new TableDataHeader(
    'creditProgramsJoin',
    'Кредитная программа',
    'string',
    'creditProgramsJoin'
  ),
  new TableDataHeader(
    'address',
    'Адрес',
    'string',
    'address'
  ),
  new TableDataHeader(
    'phoneNumber',
    'Номер телефона',
    'string',
    'phoneNumber'
  ),
  new TableDataHeader(
    'bankAccount',
    'Счет в банке',
    'string',
    'bankAccount'
  ),
  new TableDataHeader(
    'status.nameRu',
    'Статус',
    'ru',
    'status.nameRu'
  ),
  new TableDataHeader(
    'status.nameAm',
    'Статус',
    'am',
    'status.nameAm'
  ),
  new TableDataHeader(
    'branchCodeAm',
    'Филиал',
    'am',
    'branch.nameAm'
  ),
  new TableDataHeader(
    'branchCodeRu',
    'Филиал',
    'ru',
    'branch.nameRu'
  ),
  new TableDataHeader(
    'brand',
    'Бренд',
    'string',
    'brand'
  ),
  new TableDataHeader('openDate', 'Дата открытия', 'date', 'openDate'),
  new TableDataHeader('closeDate', 'Дата закрытия', 'date', 'closeDate'),
  new TableDataHeader(
    'managersJoin',
    'Менеджер',
    'string',
    'managersJoin'
  ),
  new TableDataHeader(
    'comment',
    'Комментарий',
    'string',
    'comment'
  ),
  new TableDataHeader(
    'usersJoin',
    'Юзеры',
    'string',
    'usersJoin'
  ),
  new TableDataHeader(
    'isOpz',
    'ОПЗ (ДА/НЕТ)',
    'status',
    'isPpz'
  ),
  new TableDataHeader(
    'defaultLimit',
    'Дефолтный лимит',
    'string',
    'defaultLimit'
  ),
  new TableDataHeader(
    'interconnectedPoint',
    'Взаимосвязанная точка',
    'string',
    'interconnectedPoint'
  ),

];
export const TRADING_COM_POINTS_HEADERS_WTOUT_OPZ: TableDataHeader[] = [
  new TableDataHeader(
    'code',
    'Код',
    'string',
    'code'
  ),
  new TableDataHeader(
    'nameRu',
    'Точка торговой компании',
    'ru',
    'nameRu'
  ),
  new TableDataHeader(
    'nameAm',
    'Точка торговой компании',
    'am',
    'nameAm'
  ),
  new TableDataHeader(
    'creditProgramsJoin',
    'Кредитная программа',
    'string',
    'creditProgramsJoin'
  ),
  new TableDataHeader(
    'address',
    'Адрес',
    'string',
    'address'
  ),
  new TableDataHeader(
    'phoneNumber',
    'Номер телефона',
    'string',
    'phoneNumber'
  ),
  new TableDataHeader(
    'bankAccount',
    'Счет в банке',
    'string',
    'bankAccount'
  ),
  new TableDataHeader(
    'status.nameRu',
    'Статус',
    'ru',
    'status.nameRu'
  ),
  new TableDataHeader(
    'status.nameAm',
    'Статус',
    'am',
    'status.nameAm'
  ),
  new TableDataHeader(
    'branchCode',
    'Филиал',
    'am',
    'branch.nameAm'
  ),
  new TableDataHeader(
    'branchCodeRu',
    'Филиал',
    'ru',
    'branch.nameRu'
  ),
  new TableDataHeader(
    'brand',
    'Бренд',
    'string',
    'brand'
  ),
  new TableDataHeader('openDate', 'Дата открытия', 'date', 'openDate'),
  new TableDataHeader('closeDate', 'Дата закрытия', 'date', 'closeDate'),
  new TableDataHeader(
    'managersJoin',
    'Менеджер',
    'string',
    'managersJoin'
  ),
  new TableDataHeader(
    'comment',
    'Комментарий',
    'string',
    'comment'
  ),
  new TableDataHeader(
    'usersJoin',
    'Юзеры',
    'string',
    'usersJoin'
  ),
  new TableDataHeader(
    'interconnectedPoint',
    'Взаимосвязанная точка',
    'string',
    'interconnectedPoint'
  ),

];

export const TRADING_COM_POINTS_FORM: AdmBaseModalFormField[] = [
  {
    code: 'code',
    type: EInputType.Text,
    placeholder: 'Код',
    required: false,
    disabled: true,
    readonly: true,
  },
  {
    code: 'dirTradingCompany',
    type: EInputType.Select,
    placeholder: 'Торговая компания',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'tradingCompanies',
    propertyName: 'displayName',
    selectEmittedValueType: ValueType.Object,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },
  {
    code: 'address',
    type: EInputType.Text,
    placeholder: 'Адрес',
    class: 'all-width-row-grid-2',
    required: true,
    disabled: false,
    readonly: false,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },

  {
    code: 'phoneNumber',
    type: EInputType.PhoneNumber,
    placeholder: 'Номер телефона',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 25,
    validatorsFns: [validateByPattern(PHONE_CODE_OPERATORS_PATTERN, InputErrorKeys.PhoneCodeFormat)],
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ],
    customValidators: [
      {
        errorKey: InputErrorKeys.IncorrectData8,
        pattern: '^[0-9]{8}$'
      }
    ],
  },
  {
    code: 'bankAccount',
    type: EInputType.Text,
    placeholder: 'Номер счета',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 14,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },
  {
    code: 'branch',
    type: EInputType.Select,
    placeholder: 'Филиал',
    required: true,
    disabled: false,
    readonly: false,
    subscribeOnChange: true,
    optionsListName: 'branchesForSelect',
    selectEmittedValueType: ValueType.Object,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },
  {
    code: 'status',
    type: EInputType.Select,
    placeholder: 'Статус',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'statuses',
    selectEmittedValueType: ValueType.Object,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },
  {
    code: 'interconnectedPoint',
    type: EInputType.Text,
    placeholder: 'Взаимосвязанная точка',
    required: false,
    disabled: false,
    readonly: false,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },
  {
    code: 'brand',
    type: EInputType.Text,
    placeholder: 'Бренд',
    required: false,
    disabled: false,
    readonly: false,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },
  {
    code: 'openDate',
    type: EInputType.Date,
    placeholder: 'Дата открытия',
    required: true,
    disabled: false,
    readonly: false,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },
  {
    code: 'closeDate',
    type: EInputType.Date,
    placeholder: 'Дата закрытия',
    required: false,
    disabled: false,
    readonly: false,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },
  {
    code: 'comment',
    type: EInputType.Textarea,
    placeholder: 'Комментарий',
    required: false,
    class: 'all-width-row-grid-2',
    disabled: false,
    readonly: false,
    maxLength: 1000,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },

  {
    code: 'defaultLimit',
    type: EInputType.Number,
    placeholder: 'Дефолтный лимит',
    required: false,
    // class: 'all-width-row-grid',
    editableForRolesList:  [RoleAuthority.RM, RoleAuthority.RM_BOSS],
    visibleForRolesList: [RoleAuthority.ADMIN, RoleAuthority.RM_BOSS, RoleAuthority.RM],
    disabled: false,
    readonly: false
  },
  {
    code: 'isOpz',
    type: EInputType.Checkbox,
    placeholder: 'ОПЗ (ДА/НЕТ)',
    required: false,
    // class: 'all-width-row-grid',
    editableForRolesList:  [RoleAuthority.RM, RoleAuthority.RM_BOSS],
    visibleForRolesList: [RoleAuthority.ADMIN, RoleAuthority.RM_BOSS, RoleAuthority.RM],
    disabled: false,
    readonly: false
  },

  {
    code: 'creditPrograms',
    type: EInputType.ListForSelect,
    placeholder: 'Кредитные программы',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'creditPrograms',
    class: 'all-width-row-grid-2',
    propertyName: 'name',
    selectEmittedValueType: ValueType.Object,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },
  {
    code: 'users',
    type: EInputType.ListForSelect,
    placeholder: 'Пользователи',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'users',
    propertyName: 'username',
    selectEmittedValueType: ValueType.Object,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },
  {
    code: 'managers',
    type: EInputType.ListForSelect,
    placeholder: 'Менеджер',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'managers',
    propertyName: 'fio',
    selectEmittedValueType: ValueType.Object,
    editableForRolesList: [
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS,
    ]
  },

];
