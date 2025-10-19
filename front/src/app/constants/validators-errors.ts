export enum InputErrorKeys {
  EmailIncorrect = 'emailIncorrect',
  IncorrectData = 'incorrectData',
  IncorrectMaxLimit = 'incorrectMaxLimit',
  IncorrectPassData = 'incorrectPassData',
  IncorrectSocData = 'incorrectSocData',
  IncorrectData8 = 'incorrectData8',
  IncorrectData9 = 'incorrectData9',
  IncorrectData10 = 'incorrectData10',
  PinIncorrect = 'pinIncorrect',
  InvalidDate = 'invalidDate',
  OnlyNumbersPattern = 'onlyNumbersPattern',
  Double = 'double',
  PhoneNumberFormat = 'phoneNumberFormat',
  PhoneCodeFormat = 'phoneCodeFormat'
}

export const VALIDATORS_ERRORS = {
  [InputErrorKeys.EmailIncorrect]: 'ErrorMessage.IncorrectData',
  [InputErrorKeys.IncorrectData]: 'ErrorMessage.IncorrectData',
  [InputErrorKeys.IncorrectPassData]: 'ErrorMessage.IncorrectPassData',
  [InputErrorKeys.IncorrectSocData]: 'ErrorMessage.IncorrectSocData',
  [InputErrorKeys.IncorrectData8]: 'ErrorMessage.IncorrectData8',
  [InputErrorKeys.IncorrectData9]: 'ErrorMessage.IncorrectData9',
  [InputErrorKeys.IncorrectData10]: 'ErrorMessage.IncorrectData10',
  [InputErrorKeys.PinIncorrect]: 'ErrorMessage.PinIncorrect',
  [InputErrorKeys.InvalidDate]: 'ErrorMessage.Required',
  [InputErrorKeys.OnlyNumbersPattern]: 'ErrorMessage.OnlyNumbers',
  [InputErrorKeys.Double]: 'ErrorMessage.Double',
  [InputErrorKeys.IncorrectMaxLimit]: 'ErrorMessage.IncorrectMaxLimit',
  [InputErrorKeys.PhoneNumberFormat]: 'ErrorMessage.PhoneNumberFormat',
  [InputErrorKeys.PhoneCodeFormat]: 'ErrorMessage.PhoneCodeFormat'
};

export enum PatternsEnum {
  Double = '^((?!0)\\d{1,8}|0|\\.\\d{1,2})($|\\.\\d{1,2}$)', /// or '^(?!$)\\d{0,8}(?:\\.\\d{1,2})?$'
  OnlyNumbersPattern = '^([0-9]+|)$'
}
