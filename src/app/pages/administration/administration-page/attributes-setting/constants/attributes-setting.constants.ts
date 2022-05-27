import {EInputType, TableDataHeader} from "@app/_models";
import {AdmBaseModalFormField} from "@app/shared/modals/administration-base-modal/constants/administration-base-modal.constants";

export const ATTRIBUTES_SETTING_HEADERS: TableDataHeader[] = [
  new TableDataHeader('product.code', 'Administration.TableHeaders.ProductCode', 'string', 'product.id'),
  new TableDataHeader('dirAbsAttribute.code', 'Administration.TableHeaders.AttributeCode', 'string', 'dirAbsAttribute.id'),
  new TableDataHeader('value', 'Administration.TableHeaders.Value', 'string', 'value'),
  new TableDataHeader('used', 'Administration.TableHeaders.Used', 'status', 'used'),
  new TableDataHeader('created', 'Administration.TableHeaders.Created', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'Administration.TableHeaders.Updated', 'dateAndTime', 'updated'),
  new TableDataHeader('changedByUsername', 'Administration.TableHeaders.ChangedBy', 'string', 'changedByUsername'),
];

export const ATTRIBUTES_SETTING_FORM: AdmBaseModalFormField[] = [
  {
    code: 'productId',
    type: EInputType.CustomSelect,
    placeholder: 'Administration.Placeholders.Product',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'productList',
    customListValueName: 'id'
  },
  {
    code: 'dirAbsAttributeId',
    type: EInputType.CustomSelect,
    placeholder: 'Administration.Placeholders.Attribute',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: 'attributeList',
    customListValueName: 'id',
    propertyName: 'key'
  },
  {
    code: 'value',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.Key',
    required: true,
    disabled: false,
    readonly: false,
  },
  {
    code: 'used',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.ActiveValue',
    required: false,
    disabled: false,
    readonly: false,
  }
  ];
