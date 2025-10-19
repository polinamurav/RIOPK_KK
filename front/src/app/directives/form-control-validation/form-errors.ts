import { InputErrorKeys, VALIDATORS_ERRORS } from '@app/constants/validators-errors';

import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  required: (error: any) => ({ message: 'ErrorMessage.Required', params: null }),
  requiredTrue: (error: any) => ({ message: 'ErrorMessage.Required', params: null }),
  minlength: ({ requiredLength, actualLength }: any) => ({
    message: 'ErrorMessage.MinLengthMessage',
    params: { requiredLength, actualLength }
  }),
  maxlength: ({ requiredLength, actualLength }: any) => ({
    message: 'ErrorMessage.MaxLengthMessage',
    params: { requiredLength, actualLength }
  }),
  min: ({ min }: any) => ({
    message: 'ErrorMessage.MinValue',
    params: { min }
  }),
  max: ({ max }: any) => ({
    message: 'ErrorMessage.MaxValue',
    params: { max }
  }),
  pattern: (error: any) => ({ message: 'ErrorMessage.IncorrectData', params: null }),
  invalid: err => ({ message: 'ErrorMessage.IncorrectValue', params: null }),
  invalidStatus: err => ({ message: 'ErrorMessage.IncorrectStatus', params: null }),

  [InputErrorKeys.IncorrectPassData]: err => ({
    message: VALIDATORS_ERRORS[InputErrorKeys.IncorrectPassData],
    params: null
  }),
  [InputErrorKeys.IncorrectMaxLimit]: err => ({
    message: VALIDATORS_ERRORS[InputErrorKeys.IncorrectMaxLimit],
    params: null
  }),
  [InputErrorKeys.IncorrectSocData]: err => ({
    message: VALIDATORS_ERRORS[InputErrorKeys.IncorrectSocData],
    params: null
  }),
  [InputErrorKeys.IncorrectData9]: err => ({ message: VALIDATORS_ERRORS[InputErrorKeys.IncorrectData9], params: null }),
  [InputErrorKeys.IncorrectData8]: err => ({ message: VALIDATORS_ERRORS[InputErrorKeys.IncorrectData8], params: null }),
  [InputErrorKeys.IncorrectData10]: err => ({
    message: VALIDATORS_ERRORS[InputErrorKeys.IncorrectData10],
    params: null
  }),
  [InputErrorKeys.EmailIncorrect]: err => ({ message: VALIDATORS_ERRORS[InputErrorKeys.EmailIncorrect], params: null }),
  [InputErrorKeys.PhoneNumberFormat]: err => ({
    message: VALIDATORS_ERRORS[InputErrorKeys.PhoneNumberFormat],
    params: null
  }),
  [InputErrorKeys.PhoneCodeFormat]: err => ({
    message: VALIDATORS_ERRORS[InputErrorKeys.PhoneCodeFormat],
    params: null
  }),
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
