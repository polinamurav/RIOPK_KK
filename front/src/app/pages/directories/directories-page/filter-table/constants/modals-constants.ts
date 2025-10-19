import { AdmBaseModalFormField } from '@app/shared/components/modals/administration-base-modal/constants/administration-base-modal.constants';
import { EInputType } from '@app/_models';

export const IMPORT_CURRENCIES_FORM: AdmBaseModalFormField[] = [
  {
    code: 'date',
    type: EInputType.Date,
    placeholder: 'Directories.CurrencysOnDate',
    required: true,
    disabled: false,
    maxDate: new Date(),
    readonly: false,
    class: 'col-6'
  }
];
