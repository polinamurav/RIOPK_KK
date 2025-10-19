import { EInputType, TableDataHeader, ValueType } from '@app/_models';
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const GOODS_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Код товара', 'string', 'code'),
  new TableDataHeader('nameRu', 'Наименование товара', 'ru', 'nameRu'),
  new TableDataHeader('nameAm', 'Наименование товара', 'am', 'nameAm'),
  new TableDataHeader('dirGoodsGroupsJoinRu', 'Группа товара', 'ru', 'dirGoodsGroupsJoinRu'),
  new TableDataHeader('dirGoodsGroupsJoinAm', 'Группа товара', 'am', 'dirGoodsGroupsJoinAm'),
  new TableDataHeader('created', 'Дата создания', 'date', 'created'),
  new TableDataHeader('updated', 'Дата изменения', 'date', 'updated'),
  new TableDataHeader('changedByUsername', 'Кем изменено', 'string', 'changedByUsername'),
  new TableDataHeader('active', 'Активно', 'status', 'active')
];

export const GOODS_FORM: AdmBaseModalFormField[] = [
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
    placeholder: 'Название товара',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255
  },
  {
    code: 'dirGoodsGroups',
    type: EInputType.ListForSelect,
    placeholder: 'Товары',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'goodsGroup',
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
