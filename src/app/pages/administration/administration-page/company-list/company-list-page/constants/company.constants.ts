import { EInputType, OptionListNames, TableDataHeader } from '@app/_models';

import { AdmBaseModalFormField } from '@app/shared/modals/administration-base-modal/constants/administration-base-modal.constants';

export const COMPANIES_HEADERS: TableDataHeader[] = [
  new TableDataHeader('id', 'Administration.TableHeaders.Code', 'string', 'id'),
  new TableDataHeader('name', 'Administration.TableHeaders.Name', 'string', 'name'),
  new TableDataHeader('inDate', 'Administration.TableHeaders.DateOfCreation', 'date', 'inDate'),
  new TableDataHeader('companyStatus.nameRu', 'Administration.TableHeaders.Status', 'ru', 'companyStatus.nameRu'),
  new TableDataHeader('companyStatus.nameGe', 'Administration.TableHeaders.Status', 'ge', 'companyStatus.nameGe'),
  new TableDataHeader('updatedDate', 'Administration.TableHeaders.DateOfUpdate', 'dateAndTime', 'updatedDate')
];

export const COMPANY_FORM: AdmBaseModalFormField[] = [
  {
    code: 'id',
    type: EInputType.Text,
    placeholder: 'Administration.TableHeaders.Code',
    required: false,
    disabled: true,
    readonly: true,
    maxLength: 3,
    pattern: /^[0-9]\d*$/,
    class: 'col-12'
  },
  {
    code: 'name',
    type: EInputType.Text,
    placeholder: 'Administration.TableHeaders.Name',
    required: false,
    disabled: true,
    readonly: true,
    maxLength: 255,
    class: 'col-12'
  },
  {
    code: 'companyStatusId',
    objectName: 'companyStatus',
    type: EInputType.Select,
    placeholder: 'Administration.TableHeaders.Status',
    optionsListName: OptionListNames.CompanyStatus,
    required: false,
    disabled: true,
    readonly: true,
    class: 'col-12'
  },
  {
    code: 'updatedDate',
    type: EInputType.Date,
    placeholder: 'Administration.TableHeaders.DateOfUpdate',
    required: false,
    disabled: true,
    readonly: true,
    class: 'col-12'
  },
  {
    code: 'tariffsSelect',
    type: EInputType.SelectWithList,
    placeholder: 'Administration.Placeholders.Tariffs',
    required: false,
    disabled: true,
    readonly: false,
    optionsListName: OptionListNames.Tariffs,
    propertyName: 'id',
    connectedList: 'tariffs',
    class: 'col-12'
  },
  {
    code: 'tariffs',
    type: EInputType.ListForSelect,
    placeholder: 'Administration.Placeholders.AssignedTariffs',
    propertyName: 'id',
    required: false,
    disabled: true,
    readonly: false
  }
];
