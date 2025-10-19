import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { InputErrorKeys } from '@app/constants/validators-errors';

export function validateInvalidDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && control.value.toString() === 'Invalid Date' ? { [InputErrorKeys.InvalidDate]: true } : null;
  };
}
