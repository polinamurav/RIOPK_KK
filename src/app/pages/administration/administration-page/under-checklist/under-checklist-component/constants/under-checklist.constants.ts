import { EInputType, TableDataHeader } from '@app/_models';

import { AdmBaseModalFormField } from '@app/shared/modals/administration-base-modal/constants/administration-base-modal.constants';

// tslint:disable-next-line: max-line-length

export const UNDER_CHECKLIST_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'КОД', 'string', 'code'),
  new TableDataHeader('productGroupId', 'ГРУППА ПРОДУКТОВ', 'string', 'productGroupId'),
  new TableDataHeader('nameRu', 'ФАКТОР ПРОВЕРКИ (рус.язык)', 'string', 'nameRu'),
  new TableDataHeader('nameGe', 'ФАКТОР ПРОВЕРКИ (груз.язык)', 'string', 'nameGe'),
  new TableDataHeader('nameEn', 'ФАКТОР ПРОВЕРКИ (англ.язык)', 'string', 'nameEn'),
  new TableDataHeader('active', 'АКТИВНО', 'status', 'active')
];

export const UNDER_CHECKLIST_FORM: AdmBaseModalFormField[] = [
  {
    code: 'code',
    type: EInputType.Text,
    placeholder: 'Код',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 5,
    pattern: /^[A-Za-z0-9]*$/,
    class: 'col-6'
  },
  {
    code: 'productGroupId',
    type: EInputType.Select,
    placeholder: 'Группа продуктов',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'productGroup',
    class: 'col-6'
  },
  {
    code: 'nameRu',
    type: EInputType.Textarea,
    placeholder: 'Фактор проверки  (рус.язык)',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-12'
  },
  {
    code: 'nameGe',
    type: EInputType.Textarea,
    placeholder: 'Фактор проверки  (груз.язык)',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 500,
    class: 'col-12'
  },
  {
    code: 'nameEn',
    type: EInputType.Textarea,
    placeholder: 'Фактор проверки  (англ.язык)',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-12'
  },

  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Активно',
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-6'
  }
];
