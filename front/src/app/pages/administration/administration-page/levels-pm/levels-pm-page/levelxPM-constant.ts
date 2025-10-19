import { EInputType, TableDataHeader } from '@app/_models';
import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';
import { InputErrorKeys, PatternsEnum } from '@app/constants/validators-errors';

export const LEVELS_PM_HEADERS: TableDataHeader[] = [
  new TableDataHeader('code', 'Administration.TableHeaders.Code', 'string', 'code'),
  new TableDataHeader('nameRu', 'Administration.TableHeaders.Name', 'ru', 'nameRu'),
  new TableDataHeader('nameAm', 'Administration.TableHeaders.Name', 'am', 'nameAm'),
  new TableDataHeader('limitFrom', 'Administration.TableHeaders.LimitFrom', 'string', 'limitFrom'),
  new TableDataHeader('limitTo', 'Administration.TableHeaders.LimitTo', 'string', 'limitTo'),
  new TableDataHeader('active', 'Administration.TableHeaders.ActiveRecord', 'status', 'active'),
  new TableDataHeader('changedByUsername', 'Administration.TableHeaders.ChangedBy', 'string', 'changedByUsername')
];

export const LEVELS_PM_FORM: AdmBaseModalFormField[] = [
  {
    code: 'code',
    type: EInputType.Text,
    placeholder: 'Administration.TableHeaders.Code',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 50,
    class: 'col-6'
  },
  {
    code: 'nameRu',
    type: EInputType.Text,
    placeholder: 'Administration.TableHeaders.Name',
    required: true,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-6'
  },
  {
    code: 'limitFrom',
    type: EInputType.Number,
    placeholder: 'Administration.TableHeaders.LimitFrom',
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-6',
    maxLength: 13,
    customValidators: [
      {
        errorKey: InputErrorKeys.Double,
        pattern: PatternsEnum.Double
      }
    ]
  },
  {
    code: 'limitTo',
    type: EInputType.Number,
    placeholder: 'Administration.TableHeaders.LimitTo',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-6',
    maxLength: 13,
    pattern: PatternsEnum.Double
    // customValidators: [
    //   {
    //     errorKey: InputErrorKeys.Double,
    //     pattern: PatternsEnum.Double
    //   }
    // ],
  },
  {
    code: 'active',
    type: EInputType.Checkbox,
    placeholder: 'Administration.TableHeaders.Active',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-12'
  }
];
