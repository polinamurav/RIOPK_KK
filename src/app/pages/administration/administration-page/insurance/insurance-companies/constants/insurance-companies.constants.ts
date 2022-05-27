import { EInputType, TableDataHeader } from '@app/_models';

import { AdmBaseModalFormField } from '@app/shared/modals/administration-base-modal/constants/administration-base-modal.constants';

// tslint:disable-next-line: max-line-length

export const INSURANCE_COMPANIES_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Administration.TableHeaders.Code', 'string', 'code'),
  new TableDataHeader('name', 'Administration.TableHeaders.Name', 'string', 'name'),
  new TableDataHeader('active', 'Administration.TableHeaders.Active', 'status', 'active')
];

export const INSURANCE_COMPANIES_FORM: AdmBaseModalFormField[] = [
  {
    code: 'name',
    type: EInputType.Text,
    placeholder: 'Administration.TableHeaders.Name',
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
    placeholder: 'Administration.TableHeaders.Code',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 3,
    pattern: /^[0-9]\d*$/,
    class: 'col-12'
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Administration.TableHeaders.Active',
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-12'
  }
];
