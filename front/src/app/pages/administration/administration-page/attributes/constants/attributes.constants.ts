import { EInputType, TableDataHeader } from '@app/_models';
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const ATTRIBUTES_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Administration.TableHeaders.Code', 'string', 'code'),
  new TableDataHeader('key', 'Administration.TableHeaders.Key', 'string', 'key'),
  new TableDataHeader('defaultValue', 'Administration.TableHeaders.DefaultValue', 'string', 'defaultValue'),
  new TableDataHeader('active', 'Administration.TableHeaders.Active', 'status', 'active'),
  new TableDataHeader('created', 'Administration.TableHeaders.Created', 'dateAndTime', 'created'),
  new TableDataHeader('updated', 'Administration.TableHeaders.Updated', 'dateAndTime', 'updated'),
  new TableDataHeader('changedByUsername', 'Administration.TableHeaders.ChangedBy', 'string', 'changedByUsername')
];

export const ATTRIBUTES_FORM: AdmBaseModalFormField[] = [
  {
    code: 'key',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.Key',
    required: true,
    disabled: false,
    readonly: false
  },
  {
    code: 'defaultValue',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.DefaultValue',
    required: true,
    disabled: false,
    readonly: false
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
