import { EInputType, ValueType } from '@app/_models';

export interface IAmlFormField {
  code: string;
  objectName?: string;
  innerObjectName?: string;
  type: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  minDate?: Date;
  maxDate?: Date;
  class?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  optionsListName?: string;
  propertyName?: string;
  selectEmittedValueType?: ValueType;
}

export enum EAmlControlsKeys {
  IsAmlNeeded = 'isAmlNeeded',
  FATCASelfCertification = 'FATCASelfCertification',
  IsUsaResident = 'isUsaResident',
  BankBusinessRelationshipPurpose = 'bankBusinessRelationshipPurpose',
  ExpectedOperations = 'expectedOperations',
  IsIpdl = 'isIpdl'
}

export const AML_FORM: IAmlFormField[] = [
  {
    code: 'isAmlNeeded',
    type: EInputType.Checkbox,
    placeholder: 'Aml.Labels.MandatoryConducting',
    required: true,
    disabled: true,
    readonly: true,
    class: 'col-4'
  },
  {
    code: 'isUsaResident',
    type: EInputType.Checkbox,
    placeholder: 'Aml.Labels.IsUSTaxResident',
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'isIpdl',
    type: EInputType.Checkbox,
    placeholder: 'Aml.Labels.PublicOfficialsBelonging',
    required: true,
    disabled: false,
    readonly: false,
    class: 'col-4'
  }
];
