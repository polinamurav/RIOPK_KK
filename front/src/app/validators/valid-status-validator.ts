import { AbstractControl, ValidationErrors } from '@angular/forms';
import { StaticDirectory, ActionType } from '@app/_models';

export function validStatusValidator(status: StaticDirectory[], action: string) {
  return (control: AbstractControl): ValidationErrors => {
    const targetStatus: StaticDirectory = status.find((st: StaticDirectory) => st.id === control.value);
    if (
      (targetStatus && targetStatus.code === '004' && action === ActionType.submit) ||
      (targetStatus && targetStatus.code === '003' && action === ActionType.cancel) ||
      action === ActionType.delay
    ) {
      return null;
    } else {
      return { invalidStatus: true };
    }
  };
}
