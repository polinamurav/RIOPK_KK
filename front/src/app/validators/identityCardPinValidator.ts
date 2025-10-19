import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

enum PatternsEnum {
  PASSPORT = 'PASSPORT',
  ID_CARD = 'ID_CARD'
}

export const PATTERN = {
  [PatternsEnum.ID_CARD]: '^[A-Z]{2}[0-9]{7}$',
  [PatternsEnum.PASSPORT]: '^[0-9]{9}$'
};

export function identityCardPinValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const passport = new RegExp(PATTERN[PatternsEnum.PASSPORT]).test(value);

    const idCard = new RegExp(PATTERN[PatternsEnum.ID_CARD]).test(value);

    const isValid = passport || idCard;

    return !isValid ? { pattern: true } : null;
  };
}
