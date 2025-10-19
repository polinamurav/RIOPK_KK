import { EInputType, TableDataHeader } from '@app/_models';

import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

// tslint:disable-next-line: max-line-length

export const VISUAL_ASSESSMENT_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'КОД', 'string', 'code'),
  new TableDataHeader('nameRu', 'ФАКТОР ОЦЕНКИ (рус.язык)', 'string', 'nameRu'),
  new TableDataHeader('nameAm', 'ФАКТОР ОЦЕНКИ (арм.язык)', 'string', 'nameAm'),
  new TableDataHeader('nameEn', 'ФАКТОР ОЦЕНКИ (англ.язык)', 'string', 'nameEn'),
  new TableDataHeader('brmsRuleTypeId', 'ФАКТОР ОЦЕНКИ В BRMS', 'string', 'brmsRuleTypeId'),
  new TableDataHeader('active', 'АКТИВНО', 'status', 'active')
];

export const VISUAL_ASSESSMENT_FORM: AdmBaseModalFormField[] = [
  {
    code: 'code',
    type: EInputType.Text,
    placeholder: 'Код',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 3,
    pattern: /^[0-9]\d*$/,
    class: 'col-6'
  },
  {
    code: 'nameRu',
    type: EInputType.Textarea,
    placeholder: 'Фактор оценки (рус.язык)',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-12'
  },
  {
    code: 'nameAm',
    type: EInputType.Textarea,
    placeholder: 'Фактор оценки (арм.язык)',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 500,
    class: 'col-12'
  },
  {
    code: 'nameEn',
    type: EInputType.Textarea,
    placeholder: 'Фактор оценки (англ.язык)',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-12'
  },
  {
    code: 'brmsRuleTypeId',
    type: EInputType.Select,
    placeholder: 'Фактор оценки в BRMS',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'brmsRuleType',
    propertyName: 'id',
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
