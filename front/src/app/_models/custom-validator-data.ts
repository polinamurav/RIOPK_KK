import { InputErrorKeys } from '@app/constants/validators-errors';

export interface CustomValidatorData {
  errorKey: InputErrorKeys;
  pattern: string;
}
