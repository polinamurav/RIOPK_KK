import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { InputErrorKeys } from '@app/constants/validators-errors';

export function validateByPattern(pattern: string, errorName: InputErrorKeys): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const symbolRegExp = new RegExp(pattern);

    return symbolRegExp.test(control.value) ? null : { [errorName]: true };
  };
}
