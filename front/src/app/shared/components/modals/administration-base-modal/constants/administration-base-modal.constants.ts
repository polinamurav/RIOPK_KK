import {BaseFormField} from '@app/_models';

export class AdmBaseModalFormField extends BaseFormField {
  uniqTextValidation?: boolean;
  uniqTextValidationErrorMessage?: string;
  subscribeOnChange?: boolean;
  roleFieldName?: string;
  requiredByRole?: (roleId: string) => boolean;
}
