import { BaseFormField, EInputType, OptionListNames, ValueType } from '@app/_models';

import { InputErrorKeys, PatternsEnum } from '@app/constants/validators-errors';

export type FullFormGroup = Record<string, BaseFormField[]>;

export enum FullFormGroupKeys {
  CreditInfo = 'creditInfo',
  ApplicantInfo = 'applicantInfo',
  DeclineReasons = 'declineReasons',
  BirthdayPlace = 'birthdayPlace',
  RegAddress = 'regAddress',
  FactAddress = 'factAddress',
  IncomeInfo = 'incomeInfo',
  CreditDetails = 'creditDetails',
  Guarantee = 'guarantee',
  Brms2 = 'brms2',
  PreApprovedConditions = 'preApprovedConditions',
  ClientCommunication = 'clientCommunication',
  AdditionalConditions = 'additionalConditions'
}

export const FULL_FORM_TITLES: Record<string, string> = {
  [FullFormGroupKeys.CreditInfo]: 'FullForm.CreditInfo',
  [FullFormGroupKeys.AdditionalConditions]: 'FullForm.AdditionalConditions',
  [FullFormGroupKeys.ApplicantInfo]: 'FullForm.ApplicantInfo',
  [FullFormGroupKeys.RegAddress]: 'FullForm.RegAddress',
  [FullFormGroupKeys.FactAddress]: 'FullForm.FactAddress',
  [FullFormGroupKeys.ClientCommunication]: 'FullForm.ClientCommunication',
  [FullFormGroupKeys.IncomeInfo]: 'FullForm.IncomeExpense',
  [FullFormGroupKeys.CreditDetails]: 'FullForm.CreditDetails',
  [FullFormGroupKeys.Guarantee]: 'FullForm.Guarantee',
  [FullFormGroupKeys.PreApprovedConditions]: 'FullForm.PreApproved',
  [FullFormGroupKeys.DeclineReasons]: 'FullForm.DeclineReason',
  [FullFormGroupKeys.AdditionalConditions]: 'FullForm.AdditionalConditions'
};

export const FULL_FORM_MATRIX: BaseFormField[] = [
  {
    code: 'matrixProduct',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.ProductType',
    required: true,
    disabled: true,
    readonly: true,
    isVisible: true,
    customValidators: [],
    class: 'col-3'
  },
  {
    code: 'preapproveCalcCreditSum',
    type: EInputType.Number,
    placeholder: 'FullForm.Placeholder.LoanAmount',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    maxLength: 12,
    customValidators: [
      {
        errorKey: InputErrorKeys.Double,
        pattern: PatternsEnum.Double
      }
    ],
    class: 'col-3'
  },
  {
    code: 'creditSum',
    type: EInputType.Text,
    placeholder: 'Сумма на рефинансирование',
    required: false,
    disabled: true,
    readonly: true,
    isVisible: false,
    maxLength: 13,
    customValidators: [
      {
        errorKey: InputErrorKeys.Double,
        pattern: PatternsEnum.Double
      }
    ],
    class: 'col-3'
  },
  {
    code: 'creditSumTopUp',
    type: EInputType.Text,
    placeholder: 'Сумма кредита под top-up',
    required: false,
    disabled: true,
    readonly: true,
    isVisible: false,
    maxLength: 13,
    customValidators: [
      {
        errorKey: InputErrorKeys.Double,
        pattern: PatternsEnum.Double
      }
    ],
    class: 'col-3'
  },
  {
    code: 'preapproveCalcCreditTerm',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.CreditTerm',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
    maxLength: 3,
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: '^([0-9]+|)$'
      }
    ],
    class: 'col-3'
  },
  {
    code: 'isInsuranceAccident',
    valuePath: 'isInsuranceAccidentValue',
    type: EInputType.Select,
    placeholder: 'FullForm.Placeholder.Insurance', // Страхование
    required: false,
    disabled: true,
    readonly: false,
    isVisible: true,
    allowEmptyValue: true,
    optionsListName: OptionListNames.YesOrNoTypes,
    class: 'col-3'
  },
  {
    code: 'isWithRef',
    type: EInputType.Inner,
    placeholder: 'isWithRef', // Рефинансирование
    required: false,
    disabled: false,
    readonly: false,
    isVisible: true,
    class: 'col-3'
  },
  {
    code: 'isBw',
    type: EInputType.Checkbox,
    placeholder: 'FullForm.Placeholder.BW',
    required: false,
    disabled: true,
    readonly: false,
    isVisible: true,
    class: 'col-3'
  },
  // {
  //   code: 'isDsa',
  //   type: EInputType.Checkbox,
  //   placeholder: 'FullForm.Placeholder.DSA',
  //   required: false,
  //   disabled: false,
  //   readonly: false,
  //   isVisible: true,
  //   class: 'col-3'
  // },
  {
    code: 'isAgentInsuranceChosen',
    type: EInputType.Checkbox,
    placeholder: 'FullForm.Placeholder.AgentInsurance',
    required: false,
    disabled: true,
    readonly: false,
    isVisible: true,
    class: 'col-3'
  }
];

export const FULL_FORM_INCOME: BaseFormField[] = [
  // {
  //   code: 'approvedIncome',
  //   type: EInputType.Text,
  //   placeholder: 'FullForm.Placeholder.ApprovedIncome',
  //   required: false,
  //   disabled: true,
  //   readonly: false,
  //   class: 'col-3'
  // },
  // {
  //   code: 'fullFormIncome',
  //   type: EInputType.Text,
  //   placeholder: 'FullForm.Placeholder.TotalIncome',
  //   required: false,
  //   disabled: true,
  //   readonly: false,
  //   class: 'col-2'
  // },
  // {
  //   code: 'totalJobExp',
  //   type: EInputType.Text,
  //   placeholder: 'FullForm.Placeholder.TotalExperience',
  //   required: true,
  //   disabled: false,
  //   readonly: false,
  //   customValidators: [
  //     {
  //       errorKey: InputErrorKeys.OnlyNumbersPattern,
  //       pattern: '^[0-9]+$'
  //     }
  //   ],
  //   class: 'col-2',
  //   visibleForRolesList: [RoleAuthority.DECISION_MAKER]
  // },
  // {
  //   code: 'shortFormIncome',
  //   type: EInputType.Text,
  //   placeholder: 'FullForm.Placeholder.ClientIncome',
  //   required: false,
  //   disabled: true,
  //   readonly: false,
  //   class: 'col-2'
  // },
  // {
  //   code: 'numberOfEnrolment',
  //   type: EInputType.Text,
  //   placeholder: 'FullForm.Placeholder.NumberOfEnrolment',
  //   required: true,
  //   disabled: false,
  //   readonly: false,
  //   customValidators: [
  //     {
  //       errorKey: InputErrorKeys.OnlyNumbersPattern,
  //       pattern: '^[0-9]+$'
  //     }
  //   ],
  //   class: 'col-2'
  // }
];

export const FULL_FORM: FullFormGroup = {
  [FullFormGroupKeys.CreditInfo]: [
    {
      code: 'productId',
      innerObjectName: 'product',
      objectName: 'requestedCreditInfo',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.ProductType', // Продукт
      required: true,
      disabled: true,
      readonly: true,
      optionsListName: OptionListNames.Product,
      class: 'col-3'
    },
    // {
    //   code: 'creditAmount',
    //   objectName: 'requestedCreditInfo',
    //   type: EInputType.Text,
    //   placeholder: 'FullForm.Placeholder.LoanAmount', // Сумма кредита
    //   required: false,
    //   disabled: true,
    //   readonly: true,
    //   class: 'col-3',
    //   isVisible: false
    // },
    // {
    //   code: 'currencyId',
    //   innerObjectName: 'dirCurrency',
    //   objectName: 'requestedCreditInfo',
    //   type: EInputType.Select,
    //   placeholder: 'FullForm.Placeholder.CurrencyAmount', // Валюта кредита
    //   required: false,
    //   disabled: true,
    //   readonly: true,
    //   optionsListName: OptionListNames.Currencies,
    //   class: 'col-3',
    //   isVisible: false
    // },
    {
      code: 'isPreApproved',
      // objectName: 'applicant',
      valuePath: 'requestedCreditInfo.product.isPreapprove',
      type: EInputType.Checkbox,
      placeholder: 'FullForm.Placeholder.PreApprovedCredit', // Предодобренный кредит
      required: false,
      disabled: true,
      readonly: true,
      class: 'col-3'
    }
  ],
  [FullFormGroupKeys.AdditionalConditions]: [
    {
      code: 'isClientVip',
      objectName: 'applicant',
      type: EInputType.Checkbox,
      placeholder: 'FullForm.Placeholder.VIPClient', // VIP клиент
      required: false,
      disabled: true,
      readonly: false,
      isVisible: false,
      class: 'col-3'
    },
    {
      code: 'isClientMilitary',
      objectName: 'applicant',
      type: EInputType.Checkbox,
      placeholder: 'FullForm.Placeholder.Military', // Силовик
      required: false,
      disabled: true,
      readonly: false,
      isVisible: false,
      class: 'col-3'
    },
    {
      code: 'ignoreIncome',
      objectName: 'applicant',
      type: EInputType.Checkbox,
      placeholder: 'FullForm.Placeholder.IgnoreIncome', // Альтернативный доход
      required: false,
      disabled: true,
      readonly: false,
      isVisible: false,
      class: 'col-3'
    },
    {
      code: 'esignAgreement',
      type: EInputType.Checkbox,
      placeholder: 'FullForm.Placeholder.ConsentToEsign', // Согласие на E-Sign доступно если предодобреный кредит
      required: false,
      disabled: false,
      readonly: false,
      isVisible: false,
      class: 'col-6'
    }
  ],
  [FullFormGroupKeys.ApplicantInfo]: [
    {
      code: 'firstName',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Name', // Имя
      required: true,
      disabled: true,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'lastName',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.LastName', // Фамилия
      required: true,
      disabled: true,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'middleName',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.MiddleName', // Отчество
      required: false,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'genderId',
      innerObjectName: 'gender',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Gender', // Пол
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      optionsListName: OptionListNames.Gender,
      class: 'col-3'
    },
    {
      code: 'birthDate',
      objectName: 'applicant',
      type: EInputType.Date,
      placeholder: 'ShortForm.BirthDate', // Дата рождения
      maxDate: new Date(),
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'identityCard.identityCardType',
      valuePath: 'applicant.identityCard.identityCardType',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.DocumentType', // Вид документа
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      optionsListName: OptionListNames.IdentityCardType,
      selectEmittedValueType: ValueType.Object,
      class: 'col-3'
    },
    {
      code: 'identityCard.pin',
      valuePath: 'applicant.identityCard.pin',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.DocumentNumber', // Номер документа
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'issueDate',
      innerObjectName: 'identityCard',
      objectName: 'applicant',
      type: EInputType.Date,
      placeholder: 'FullForm.Placeholder.IssueDate', // Дата выдачи паспорта
      maxDate: new Date(),
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'validityDate',
      innerObjectName: 'identityCard',
      objectName: 'applicant',
      type: EInputType.Date,
      placeholder: 'FullForm.Placeholder.ValidityUntilDate', // Действителен до
      maxDate: new Date(),
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'issuedBy',
      innerObjectName: 'identityCard',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.FromOutside', // Со стороны
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'citizenship',
      valuePath: 'applicant.citizenship.id',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Citizenship', // Гражданство
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      optionsListName: OptionListNames.Countries,
      class: 'col-3'
    },
    {
      code: 'socCard.identityCardType',
      valuePath: 'applicant.socCard.identityCardType',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.SocialCardType', // Вид социальной карты
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.SocialCardType,
      class: 'col-3'
    },
    {
      code: 'socCard.pin',
      valuePath: 'applicant.socCard.pin',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.SocialCardNumber', // Номер социальной карты
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    }
  ],
  [FullFormGroupKeys.RegAddress]: [
    {
      code: 'country',
      innerObjectName: 'regAddressObj',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Country', // Страна
      required: true,
      disabled: false,
      disabledIfValue: true,
      showValueIfOptionsIsEmpty: true,
      readonly: false,
      propertyName: 'nameAm',
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Countries,
      class: 'col-3'
    },
    {
      code: 'region',
      valuePath: 'applicant.regAddressObj.regionForShow',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Region', // Область
      required: true,
      disabled: false,
      disabledIfValue: true,
      showOnlyValueIfExist: true,
      readonly: false,
      propertyName: 'nameAm',
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Regions, // TODO Romanovski:  change 'optionsListName' when rest api is ready
      class: 'col-3'
    },
    {
      code: 'city',
      valuePath: 'applicant.regAddressObj.cityForShow',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.City', // Город
      required: true,
      disabled: false,
      disabledIfValue: true,
      showOnlyValueIfExist: true,
      readonly: false,
      propertyName: 'nameAm',
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Cities,
      class: 'col-3'
    },
    {
      code: 'residence',
      valuePath: 'applicant.regAddressObj.residenceForShow',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.District', // Район
      required: true,
      disabled: false,
      disabledIfValue: true,
      showOnlyValueIfExist: true,
      readonly: false,
      propertyName: 'nameAm',
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.District,
      class: 'col-3'
    },
    {
      code: 'street',
      valuePath: 'applicant.regAddressObj.street',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Street', // Улица
      required: true,
      disabled: false,
      maxLength: 500,
      pattern: /^([0-9Ա-Ֆա-ֆև\-\s]+|\s*)$/i,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'building',
      innerObjectName: 'regAddressObj',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Building', // Дом
      required: false,
      disabled: false,
      maxLength: 10,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'buildingType',
      innerObjectName: 'regAddressObj',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.BuildingType', // корпус
      required: false,
      disabled: false,
      maxLength: 10,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'apartment',
      innerObjectName: 'regAddressObj',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Apartment', // квартира
      required: false,
      disabled: false,
      maxLength: 10,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'isRealEqFactAddress',
      valuePath: 'applicant.isRealEqFactAddress',
      type: EInputType.Checkbox,
      placeholder: 'FullForm.RegAddressIsMatchesWhitFact',
      required: false,
      disabled: false,
      readonly: false,
      class: 'col-6'
    }
  ],
  [FullFormGroupKeys.FactAddress]: [
    {
      code: 'country',
      valuePath: 'applicant.factAddressObj.country',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Country', // Страна
      required: true,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      propertyName: 'nameAm',
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Countries,
      class: 'col-3'
    },
    {
      code: 'region',
      valuePath: 'applicant.factAddressObj.regionForShow',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Region', // Область
      required: true,
      disabled: false,
      propertyName: 'nameAm',
      disabledIfValue: true,
      showOnlyValueIfExist: true,
      readonly: false,
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Regions, // TODO Romanovski:  change 'optionsListName' when rest api is ready
      class: 'col-3'
    },
    {
      code: 'city',
      valuePath: 'applicant.factAddressObj.cityForShow',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.City', // Город
      required: true,
      disabled: false,
      disabledIfValue: true,
      showOnlyValueIfExist: true,
      readonly: false,
      propertyName: 'nameAm',
      selectEmittedValueType: ValueType.Object,
      optionsListName: 'factCommunities',
      class: 'col-3'
    },
    {
      code: 'residence',
      valuePath: 'applicant.factAddressObj.residenceForShow',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.District', // Район
      required: true,
      disabled: false,
      disabledIfValue: true,
      showOnlyValueIfExist: true,
      readonly: false,
      propertyName: 'nameAm',
      selectEmittedValueType: ValueType.Object,
      optionsListName: 'factResidences',
      class: 'col-3'
    },
    {
      code: 'street',
      valuePath: 'applicant.factAddressObj.street',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Street', // Улица
      required: true,
      disabled: false,
      maxLength: 500,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3',
      pattern: /^([0-9Ա-Ֆա-ֆև\-\s]+|\s*)$/i
    },
    {
      code: 'building',
      valuePath: 'applicant.factAddressObj.building',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Building', // Дом
      required: true,
      disabled: false,
      maxLength: 10,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'buildingType',
      valuePath: 'applicant.factAddressObj.buildingType',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.BuildingType', // корпус
      required: false,
      maxLength: 10,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'apartment',
      valuePath: 'applicant.factAddressObj.apartment',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Apartment', // квартира
      required: false,
      maxLength: 10,
      disabled: false,
      disabledIfValue: true,
      readonly: false,
      class: 'col-3'
    }
  ],
  [FullFormGroupKeys.ClientCommunication]: [
    {
      code: 'mobilePhone',
      objectName: 'applicant',
      type: EInputType.PhoneNumber,
      placeholder: 'FullForm.Placeholder.MobilePhoneNumber', // Номер мобильного телефона
      required: false,
      disabled: true,
      readonly: true,
      disabledIfValue: true,
      class: 'col-3'
    },
    {
      code: 'homePhone',
      objectName: 'applicant',
      type: EInputType.PhoneNumber,
      placeholder: 'FullForm.Placeholder.HomePhoneNumber', // Номер домашнего телефона
      required: false,
      disabled: false,
      readonly: false,
      customValidators: [
        {
          errorKey: InputErrorKeys.IncorrectData8,
          pattern: '^[0-9]{8}$'
        }
        // {
        //   errorKey:  InputErrorKeys.PhoneNumberFormat, // Номер телефона должен содержать хотя бы 1 цифру отличную от 0
        //   pattern:  '^(?!0+$)\\d+$'
        // },
      ],
      class: 'col-3'
    },
    {
      code: 'email',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Email', // E-mail
      required: false,
      disabled: false,
      readonly: false,
      disabledIfValue: true,
      maxLength: 255,
      customValidators: [
        {
          errorKey: InputErrorKeys.EmailIncorrect,
          pattern: '^[a-zA-Z0-9_+-]([.a-zA-Z0-9_+-]*[a-zA-Z0-9_+-])?@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'
        }
      ],
      class: 'col-3'
    }
  ]
};
