import { EInputType, TableDataHeader, ValueType } from '@app/_models';
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const BLACKLIST_HEADERS: TableDataHeader[] = [
  new TableDataHeader(
    'blacklistItemValue',
    'Administration.TableHeaders.BlackList.BlacklistItemValue',
    'string',
    'blacklistItemValue'
  ),
  new TableDataHeader('active', 'Administration.TableHeaders.BlackList.Active', 'status', 'active'),
  new TableDataHeader(
    'blacklistComment',
    'Administration.TableHeaders.BlackList.BlacklistComment',
    'string',
    'blacklistComment'
  ),
  new TableDataHeader('created', 'Administration.TableHeaders.BlackList.Created', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'Administration.TableHeaders.BlackList.Updated', 'dateAndTime', 'updated'),
  new TableDataHeader(
    'changedByUsername',
    'Administration.TableHeaders.BlackList.ChangedByUsername',
    'string',
    'changedByUsername'
  ),
  new TableDataHeader(
    'blacklistItem.nameRu',
    'Administration.TableHeaders.BlackList.BlacklistItem',
    'ru',
    'blacklistItem.nameRu'
  ),
  new TableDataHeader(
    'blacklistItem.nameAm',
    'Administration.TableHeaders.BlackList.BlacklistItem',
    'am',
    'blacklistItem.nameAm'
  )
];

export const BLACKLIST_FORM: AdmBaseModalFormField[] = [
  {
    code: 'blacklistItemValue',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.BlacklistItemValue',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'blacklistComment',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.BlacklistComment',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'blacklistItem',
    type: EInputType.Select,
    placeholder: 'Administration.Placeholders.BlacklistItem',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: 'blacklistItem',
    selectEmittedValueType: ValueType.Object
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.ActiveValue',
    required: false,
    disabled: false,
    readonly: false
  }
];
