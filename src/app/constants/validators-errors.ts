export enum InputErrorKeys {
  EmailIncorrect = 'emailIncorrect',
  PinIncorrect = 'pinIncorrect',
  InvalidDate = 'invalidDate',
  OnlyNumbersPattern = 'onlyNumbersPattern',
  Double = 'double'
}

export const VALIDATORS_ERRORS = {
  [InputErrorKeys.EmailIncorrect]: 'ErrorMessage.IncorrectData',
  [InputErrorKeys.PinIncorrect]: 'ErrorMessage.PinIncorrect',
  [InputErrorKeys.InvalidDate]: 'ErrorMessage.Required',
  [InputErrorKeys.OnlyNumbersPattern]: 'ErrorMessage.OnlyNumbers',
  [InputErrorKeys.Double]: 'ErrorMessage.Double'
};
