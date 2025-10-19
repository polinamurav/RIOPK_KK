import { BaseFormField, EInputType, OptionListNames, ValueType } from '@app/_models';
import { BaseDeclaration } from '@angular/compiler-cli/src/ngtsc/reflection';
import { InputErrorKeys } from '@app/constants/validators-errors';

export interface IAmlFormField extends BaseFormField {
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
  isVisible?: boolean;
  pattern?: RegExp;
  optionsListName?: string;
  propertyName?: string;
  selectEmittedValueType?: ValueType;
}

export enum EAmlControlsKeys {
  IsAmlNeeded = 'isAmlNeeded',
  FATCASelfCertification = 'FATCASelfCertification',
  IsUsaResident = 'isUsaResident',
  UsaResidentInfo = 'addressTaxResFatca',
  UsaFactAddress = 'addressFactFatca',
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
    code: 'phoneNumber',
    type: EInputType.PhoneNumber,
    placeholder: 'ShortForm.PhoneNumber',
    required: false,
    disabled: false,
    readonly: false,
    isVisible: false,
    class: 'col-3',
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: '^[0-9]+$'
      }
    ]
  },
  {
    code: 'selfcertificationDate',
    type: EInputType.Date,
    placeholder: 'Aml.Placeholders.SelfCertificationDate', // Дата самосертификации
    required: false,
    disabled: true,
    readonly: true,
    class: 'col-3'
  },
  {
    code: 'fatcaStatus',
    type: EInputType.Select,
    placeholder: 'Aml.Placeholders.StatusFATCA', // Статус FATCA
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.FatcaStatus,
    selectEmittedValueType: ValueType.Object,
    class: 'col-4'
  }
];

export const USA_FACT_ADDRESS: BaseFormField[] = [
  {
    code: 'floor',
    valuePath: 'addressFactFatca.floor',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.Floor', // Этаж
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 3
  },
  {
    code: 'building',
    valuePath: 'addressFactFatca.building',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.House', // Дом/Стр
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 10
  },
  {
    code: 'street',
    valuePath: 'addressFactFatca.street',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.Street', // Улица
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 255,
    pattern: '^[A-Za-z\\s]+$'
  },
  {
    code: 'city',
    valuePath: 'addressFactFatca.city',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.City', // Город
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 255,
    pattern: '^[A-Za-z\\s]+$'
  },
  {
    code: 'locationCode',
    valuePath: 'addressFactFatca.locationCode',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.Index', // Индекс
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 255
  },
  {
    code: 'postalIndex',
    valuePath: 'addressFactFatca.postalIndex',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.PostBox', // Почтовыйящик
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 255
  },
  {
    code: 'country',
    valuePath: 'addressFactFatca.country',
    type: EInputType.Select,
    placeholder: 'Aml.Placeholders.Country', // Страна
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.Countries,
    selectEmittedValueType: ValueType.Object,
    class: 'col-3',
    allowEmptyValue: true
  },
  {
    code: 'dirFatcaRegion',
    valuePath: 'addressFactFatca.dirFatcaRegion',
    type: EInputType.Select,
    placeholder: 'Aml.Placeholders.Region', // Регион
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.Regions,
    selectEmittedValueType: ValueType.Object,
    class: 'col-3',
    allowEmptyValue: true
  }
];

export const USA_RESIDENT_INFO_FORM: BaseFormField[] = [
  {
    code: 'attributeFatca',
    type: EInputType.Select,
    placeholder: 'Aml.Placeholders.FATCASign', // FATCA признак
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.AttributeFatca,
    selectEmittedValueType: ValueType.Object,
    class: 'col-3',
    allowEmptyValue: true
  },
  {
    code: 'tin',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.TIN', // TIN
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 9,
    class: 'col-3',
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: '^[0-9]+$'
      }
    ]
  },
  {
    code: 'firstName',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.FirstName', // Имя
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-3',
    pattern: /^([А-Яа-яЁёԱ-Ֆա-ֆև\-\s]+|\s*)$/i
  },
  {
    code: 'lastName',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.LastName', // Фамилия
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-3',
    pattern: /^([А-Яа-яЁёԱ-Ֆա-ֆև\-\s]+|\s*)$/i
  },
  {
    code: 'middleName',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.MiddleName', // Отчество
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-3',
    pattern: /^([А-Яа-яЁёԱ-Ֆա-ֆև\-\s]+|\s*)$/i
  },
  {
    code: 'floor',
    valuePath: 'addressTaxResFatca.floor',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.Floor', // Этаж
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 3
  },
  {
    code: 'building',
    valuePath: 'addressTaxResFatca.building',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.House', // Дом/Стр.
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 10
  },
  {
    code: 'street',
    valuePath: 'addressTaxResFatca.street',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.Street', // Улица
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 255,
    pattern: '^[A-Za-z\\s]+$'
  },
  {
    code: 'city',
    valuePath: 'addressTaxResFatca.city',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.City', // Город
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 255,
    pattern: '^[A-Za-z\\s]+$'
  },
  {
    code: 'locationCode',
    valuePath: 'addressTaxResFatca.locationCode',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.Index', // Индекс
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 255
  },
  {
    code: 'postalIndex',
    valuePath: 'addressTaxResFatca.postalIndex',
    type: EInputType.Text,
    placeholder: 'Aml.Placeholders.PostBox', // Почтовый ящик
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3',
    maxLength: 255
  },
  {
    code: 'country',
    valuePath: 'addressTaxResFatca.country',
    type: EInputType.Select,
    placeholder: 'Aml.Placeholders.Country', // Страна
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.Countries,
    selectEmittedValueType: ValueType.Object,
    class: 'col-3',
    allowEmptyValue: true
  },
  {
    code: 'dirFatcaRegion',
    valuePath: 'addressTaxResFatca.dirFatcaRegion',
    type: EInputType.Select,
    placeholder: 'Aml.Placeholders.Region', // Регион
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.Regions,
    selectEmittedValueType: ValueType.Object,
    class: 'col-3',
    allowEmptyValue: true
  }
];
