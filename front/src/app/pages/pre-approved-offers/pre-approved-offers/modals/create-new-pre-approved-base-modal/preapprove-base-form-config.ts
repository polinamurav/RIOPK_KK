import { BaseFormField, EInputType, OptionListNames } from '@app/_models';
import { InputErrorKeys } from '@app/constants/validators-errors';

export const PREAPPROVE_BASE_FORM: BaseFormField[] = [
  {
    code: 'details',
    type: EInputType.Text,
    placeholder: 'Название базы',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    maxLength: 255,
    // optionsListName: OptionListNames.Product,
    allowEmptyValue: false,
    class: 'col-12'
  },
  {
    code: 'activateDate',
    type: EInputType.Date,
    placeholder: 'Дата активации',
    required: true,
    disabled: false,
    // maxDate: new Date(),
    isVisible: false,
    readonly: false,
    class: 'col-6'
  },
  {
    code: 'endDate',
    type: EInputType.Date,
    placeholder: 'Aml.Placeholders.ValidityDate',
    required: true,
    disabled: false,
    // maxDate: new Date(),
    isVisible: false,
    readonly: false,
    class: 'col-6'
  }
];

export const BASE_RUN_CONFIG: BaseFormField[] = [
  {
    code: 'blackListEnabled',
    type: EInputType.Checkbox,
    placeholder: 'АБС ЧС',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-2'
  },
  {
    code: 'ichEnabled',
    type: EInputType.Checkbox,
    placeholder: 'АБС ВКИ',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-2'
  },
  {
    code: 'ekengGosRegistrEnabled',
    type: EInputType.Checkbox,
    placeholder: 'Гос. регис',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-2'
  },
  {
    code: 'acraEnabled',
    type: EInputType.Checkbox,
    placeholder: 'АКРА',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-2'
  },
  {
    code: 'norqEnabled',
    type: EInputType.Checkbox,
    placeholder: 'НОРК',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-2'
  },
  {
    code: 'ekengPekEnabled',
    type: EInputType.Checkbox,
    placeholder: 'ЭКЕНГ',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-2'
  },
  {
    code: 'employerApplicationsEnabled',
    type: EInputType.Checkbox,
    placeholder: 'АБС Заявки',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-2'
  }
];
