import { InputErrorKeys, VALIDATORS_ERRORS } from '@app/constants/validators-errors';

import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  required: (error: any) => ({ message: 'ErrorMessage.Required', params: null }),
  minlength: ({ requiredLength, actualLength }: any) => ({
    message: 'ErrorMessage.MaxLengthMessage',
    params: { requiredLength, actualLength }
  }),
  maxlength: ({ requiredLength, actualLength }: any) => ({
    message: 'ErrorMessage.MaxLengthMessage',
    params: { requiredLength, actualLength }
  }),
  pattern: (error: any) => ({ message: 'ErrorMessage.IncorrectData', params: null }),
  min: ({ min }: any) => ({
    message: 'ErrorMessage.MinValue',
    params: { min }
  }),
  max: ({ max }: any) => ({
    message: 'ErrorMessage.MaxValue',
    params: { max }
  }),
  invalid: err => ({ message: 'ErrorMessage.IncorrectValue', params: null }),
  invalidStatus: err => ({ message: 'ErrorMessage.IncorrectStatus', params: null }),

  [InputErrorKeys.EmailIncorrect]: err => ({ message: VALIDATORS_ERRORS[InputErrorKeys.EmailIncorrect], params: null }),
  [InputErrorKeys.PinIncorrect]: err => ({ message: VALIDATORS_ERRORS[InputErrorKeys.PinIncorrect], params: null }),
  [InputErrorKeys.InvalidDate]: err => ({ message: VALIDATORS_ERRORS[InputErrorKeys.InvalidDate], params: null }),
  [InputErrorKeys.Double]: err => ({ message: VALIDATORS_ERRORS[InputErrorKeys.Double], params: null }),
  [InputErrorKeys.OnlyNumbersPattern]: err => ({
    message: VALIDATORS_ERRORS[InputErrorKeys.OnlyNumbersPattern],
    params: null
  })
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
