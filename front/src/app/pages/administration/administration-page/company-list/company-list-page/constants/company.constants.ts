import { EInputType, TableDataHeader } from '@app/_models';

import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';

export const COMPANIES_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Administration.TableHeaders.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'Administration.TableHeaders.Name', 'ru', 'nameRu'),
  new TableDataHeader('nameAm', 'Administration.TableHeaders.Name', 'am', 'nameAm'),
  new TableDataHeader('inn', 'ИНН', 'string', 'inn'),
  new TableDataHeader('segment', 'Сегмент', 'string', 'segment'),
  new TableDataHeader('branchCode', 'Код филиала', 'string', 'branchCode'),
  new TableDataHeader('isPeopleOfAction', 'Люди дела', 'status', 'isPeopleOfAction'),
  new TableDataHeader('active', 'Активно', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'Кем изменено', 'string', 'changedByUsername')
];

export const COMPANY_FORM: AdmBaseModalFormField[] = [
  {
    code: 'code',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.CompanyСode',
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'nameAm',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.Name',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'legalForm',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.LegalForm',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'inn',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.Inn',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'segment',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.Segment',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'employeeNumber',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.NumberEmployees',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'industry',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.ScopeOrganization',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'salaryFund',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.SalaryFundOrganization',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'branchCode',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.BranchCode',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'isSalaryProject',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.AvailabilityProject',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'numberForSalaryCard',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.CompanyNumberForCreditCards',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'status',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.StatusOrganization',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'absCode',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.ABCCode',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'accreditationDate',
    type: EInputType.Date,
    placeholder: 'Administration.Placeholders.DateAccreditation',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'cooperationType',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.TypeCooperation',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'accreditationType',
    type: EInputType.Text,
    placeholder: 'Administration.Placeholders.TypeAccreditation',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'salaryProjectDate',
    type: EInputType.Date,
    placeholder: 'Administration.Placeholders.DateSigningProject',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'isPeopleOfAction',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.PeopleBusiness',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Administration.Placeholders.ActiveRecording',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-12'
  },
  {
    code: 'comment',
    type: EInputType.Textarea,
    placeholder: 'Administration.Placeholders.Comments',
    required: false,
    disabled: true,
    readonly: false,
    scroll: true,
    class: 'full-row'
  }
];
