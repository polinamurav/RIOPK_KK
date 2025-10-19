import { EInputType, TableDataHeader, ValueType } from '@app/_models';
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const TRADING_COM_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Код', 'string', 'code'),
  new TableDataHeader('companyName', 'Наименование компании', 'string', 'companyName'),
  new TableDataHeader('inn', 'ИНН компании', 'string', 'inn'),
  new TableDataHeader('status.nameRu', 'Статус', 'ru', 'status.nameRu'),
  new TableDataHeader('status.nameAm', 'Статус', 'am', 'status.nameAm'),
  new TableDataHeader('active', 'Активно', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'Кем изменено', 'string', 'changedByUsername')
];

export const TRADING_COM_FORM: AdmBaseModalFormField[] = [
  {
    code: 'code',
    type: EInputType.Text,
    placeholder: 'Код Компании',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 50
  },
  {
    code: 'companyName',
    type: EInputType.Text,
    placeholder: 'Наименование',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255
  },
  {
    code: 'inn',
    type: EInputType.Text,
    placeholder: 'ИНН',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 10
  },
  {
    code: 'status',
    type: EInputType.Select,
    placeholder: 'Статус',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'statuses',
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'dirTradingCompanyPoints',
    type: EInputType.ListForSelect,
    placeholder: 'Торговые точки',
    required: false,
    disabled: false,
    readonly: false,
    isVisible: true,
    optionsListName: 'dirTradingCompanyPoints',
    propertyName: 'nameAm',
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'comment',
    type: EInputType.Textarea,
    class: 'col-grid-12',
    placeholder: 'Комментарий',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 1000
  }
];
