import { EInputType, TableDataHeader } from '@app/_models';

import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const DIR_PARTNERS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Код', 'string'),
  new TableDataHeader('name', 'Наименование', 'string'),
  new TableDataHeader('accountNumber', 'Номер счета', 'string'),
  new TableDataHeader('active', 'Активная запись', 'status')
];

export const DIR_PARTNERS_FORM: AdmBaseModalFormField[] = [
  {
    code: 'name',
    type: EInputType.Text,
    placeholder: 'Наименование',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255,
    pattern: /^([а-яё\s]+|[a-z\s]+)$/iu,
    class: 'col-12'
  },
  {
    code: 'code',
    type: EInputType.Text,
    placeholder: 'Код',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 3,
    pattern: /^[0-9]\d*$/,
    class: 'col-12'
  },
  {
    code: 'accountNumber',
    type: EInputType.Text,
    placeholder: 'Номер счета',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 3,
    pattern: /^[0-9]\d*$/,
    class: 'col-12'
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Активно',
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-12'
  }
];
