import { EInputType, TableDataHeader, ValueType } from '@app/_models';
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const GOODS_GROUP_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Код', 'string', 'code'),
  new TableDataHeader('nameRu', 'Название группы', 'ru', 'nameRu'),
  new TableDataHeader('nameAm', 'Название группы', 'am', 'nameAm'),
  new TableDataHeader('updated', 'Дата изменения', 'date', 'updated'),
  new TableDataHeader('active', 'Активно', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'Кем изменено', 'string', 'changedByUsername')
];

export const GOODS_GROUP_FORM: AdmBaseModalFormField[] = [
  {
    code: 'code',
    type: EInputType.Text,
    placeholder: 'Код',
    required: false,
    disabled: true,
    readonly: true,
    maxLength: 50
  },
  {
    code: 'nameRu',
    type: EInputType.Text,
    placeholder: 'Название группы',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255
  },
  {
    code: 'dirGoods',
    type: EInputType.ListForSelect,
    placeholder: 'Товары',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'goods',
    propertyName: 'nameRu',
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Активная запись',
    required: false,
    disabled: false,
    readonly: false
  }
];
