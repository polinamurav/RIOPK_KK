import { CustomValidatorData, RoleAuthority, ValueType } from '.';

export class BaseFormField {
  code: string;
  type: string;
  objectName?: string;
  innerObjectName?: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  optionsListName?: string;
  propertyName?: string;
  class?: string;
  minDate?: Date | string;
  maxDate?: Date | string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  customListValueName?: string;
  selectEmittedValueType?: ValueType;
  customValidators?: CustomValidatorData[];
  pattern?: RegExp;
  connectedList?: string;
  visibleForRolesList?: RoleAuthority[];
  compareWithProp?: string;
}
