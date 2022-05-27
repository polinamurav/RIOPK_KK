import { BaseFormField, EInputType, OptionListNames, RoleAuthority, ValueType } from '@app/_models';

import { InputErrorKeys } from '@app/constants/validators-errors';

export type FullFormGroup = Record<string, BaseFormField[]>;

export enum FullFormGroupKeys {
  CreditInfo = 'creditInfo',
  ApplicantInfo = 'applicantInfo',
  DeclineReasons = 'declineReasons',
  BirthdayPlace = 'birthdayPlace',
  RegistrationAddress = 'registrationAddress',
  FactAddress = 'factAddress',
  IncomeInfo = 'incomeInfo',
  CreditDetails = 'creditDetails',
  Guarantee = 'guarantee',
  Brms2 = 'brms2',
  PreApprovedConditions = 'preApprovedConditions'
}

export const FULL_FORM_TITLES: Record<string, string> = {
  [FullFormGroupKeys.CreditInfo]: 'FullForm.CreditInfo',
  [FullFormGroupKeys.ApplicantInfo]: 'FullForm.ApplicantInfo',
  [FullFormGroupKeys.BirthdayPlace]: 'FullForm.BirthdayPlace',
  [FullFormGroupKeys.RegistrationAddress]: 'FullForm.RegistrationAddress',
  [FullFormGroupKeys.FactAddress]: 'FullForm.FactAddress',
  [FullFormGroupKeys.IncomeInfo]: 'FullForm.IncomeExpense',
  [FullFormGroupKeys.CreditDetails]: 'FullForm.CreditDetails',
  [FullFormGroupKeys.Guarantee]: 'FullForm.Guarantee',
  [FullFormGroupKeys.PreApprovedConditions]: 'FullForm.PreApproved',
  [FullFormGroupKeys.DeclineReasons]: 'FullForm.DeclineReason'
};

export const FULL_FORM_MATRIX: BaseFormField[] = [
  {
    code: 'matrixProduct',
    type: EInputType.Text,
    placeholder: 'ShortForm.ProductType',
    required: false,
    disabled: true,
    readonly: true,
    customValidators: [],
    class: 'col-3'
  },
  {
    code: 'preapproveCalcCreditSum',
    type: EInputType.Text,
    placeholder: 'ShortForm.CreditAmount',
    required: false,
    disabled: true,
    readonly: false,
    customValidators: [
      {
        errorKey: InputErrorKeys.Double,
        pattern: '^\\d{0,8}(?:\\.\\d{1,2})?$'
      }
    ],
    class: 'col-3'
  },
  {
    code: 'preapproveCalcCreditTerm',
    type: EInputType.Text,
    placeholder: 'ShortForm.CreditTerm',
    required: false,
    disabled: true,
    readonly: false,
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: '^([0-9]+|)$'
      }
    ],
    class: 'col-3'
  },
  {
    code: 'freshMoney',
    type: EInputType.Inner,
    placeholder: 'freshMoney',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'gracePeriod',
    type: EInputType.Text,
    placeholder: 'FullForm.TableHeaders.GracePeriod',
    required: false,
    disabled: true,
    readonly: false,
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: '^([0-9]+|)$'
      }
    ],
    class: 'col-3'
  },
  {
    code: 'chosenProduct',
    type: EInputType.Inner,
    placeholder: 'chosenProduct',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'isGraceInterest',
    objectName: 'chosenCreditInfo',
    type: EInputType.Checkbox,
    placeholder: 'isGraceInterest',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'isWithRef',
    type: EInputType.Inner,
    placeholder: 'isWithRef',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3'
  }
];

export const FULL_FORM_INCOME: BaseFormField[] = [
  {
    code: 'approvedIncome',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.ApprovedIncome',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'fullFormIncome',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.TotalIncome',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-2'
  },
  {
    code: 'totalJobExp',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.TotalExperience',
    required: true,
    disabled: false,
    readonly: false,
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: '^[0-9]+$'
      }
    ],
    class: 'col-2',
    visibleForRolesList: [RoleAuthority.DECISION_MAKER]
  },
  {
    code: 'shortFormIncome',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.ClientIncome',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-2'
  },
  {
    code: 'numberOfEnrolment',
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.NumberOfEnrolment',
    required: true,
    disabled: false,
    readonly: false,
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: '^[0-9]+$'
      }
    ],
    class: 'col-2'
  }
];

export const FULL_FORM: FullFormGroup = {
  [FullFormGroupKeys.CreditInfo]: [
    {
      code: 'productId',
      innerObjectName: 'product',
      objectName: 'requestedCreditInfo',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.ProductType',
      required: true,
      disabled: true,
      readonly: false,
      optionsListName: OptionListNames.Product,
      class: 'col-4'
    },
    {
      code: 'creditAmount',
      objectName: 'requestedCreditInfo',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.LoanAmount',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-4'
    },
    {
      code: 'creditTerm',
      objectName: 'requestedCreditInfo',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.CreditTerm',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-4'
    },

    {
      code: 'dirCreditPurposeId',
      innerObjectName: 'dirCreditPurpose',
      objectName: 'requestedCreditInfo',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.CreditPurpose',
      required: true,
      disabled: false,
      readonly: false,
      optionsListName: OptionListNames.CreditPurpose,
      class: 'col-4'
    }
  ],
  [FullFormGroupKeys.ApplicantInfo]: [
    {
      code: 'firstName',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Name',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'lastName',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.LastName',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'genderId',
      innerObjectName: 'gender',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Gender',
      required: true,
      disabled: true,
      readonly: false,
      optionsListName: OptionListNames.Gender,
      class: 'col-3'
    },
    {
      code: 'birthDate',
      objectName: 'applicant',
      type: EInputType.Date,
      placeholder: 'ShortForm.BirthDate',
      maxDate: new Date(),
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'number',
      innerObjectName: 'identityCard',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.DocumentNumber',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'pin',
      innerObjectName: 'identityCard',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'ShortForm.PinCode',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'issueDate',
      innerObjectName: 'identityCard',
      objectName: 'applicant',
      type: EInputType.Date,
      placeholder: 'FullForm.Placeholder.IssueDate',
      maxDate: new Date(),
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'validityDate',
      innerObjectName: 'identityCard',
      objectName: 'applicant',
      type: EInputType.Date,
      placeholder: 'FullForm.Placeholder.ValidityDate',
      maxDate: new Date(),
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'issuedBy',
      innerObjectName: 'identityCard',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Authority',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'dirCountry',
      innerObjectName: 'identityCard',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.CountryByPassport',
      required: true,
      disabled: true,
      readonly: false,
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Countries,
      class: 'col-3'
    },
    {
      code: 'citizenship',
      innerObjectName: 'citizenship',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Citizenship',
      required: true,
      disabled: true,
      readonly: false,
      optionsListName: OptionListNames.Countries,
      class: 'col-3'
    },
    {
      code: 'doubleCitizenship',
      innerObjectName: 'doubleCitizenship',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.DoubleCitizenship',
      required: true,
      disabled: true,
      readonly: false,
      optionsListName: OptionListNames.Countries,
      class: 'col-3'
    },
    {
      code: 'isResident',
      objectName: 'applicant',
      type: EInputType.Checkbox,
      placeholder: 'FullForm.Placeholder.Resident',
      required: false,
      disabled: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'isUrgent',
      objectName: 'applicant',
      type: EInputType.Checkbox,
      placeholder: 'FullForm.Placeholder.UrgentDocument',
      required: false,
      disabled: true,
      readonly: false,
      class: 'col-3 mr-30'
    },
    {
      code: 'mobilePhone',
      objectName: 'applicant',
      type: EInputType.PhoneNumber,
      placeholder: 'FullForm.Placeholder.MobilePhone',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    },
    {
      code: 'email',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.Email',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    }
  ],
  [FullFormGroupKeys.BirthdayPlace]: [
    {
      code: 'country',
      innerObjectName: 'birthAddressObj',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Country',
      required: true,
      disabled: true,
      readonly: false,
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Countries,
      class: 'col-3'
    },
    {
      code: 'birthPlace',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.City',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-3'
    }
  ],
  [FullFormGroupKeys.RegistrationAddress]: [
    {
      code: 'country',
      innerObjectName: 'regAddressObj',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Country',
      required: true,
      disabled: true,
      readonly: false,
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Countries,
      class: 'col-3'
    },
    {
      code: 'city',
      innerObjectName: 'regAddressObj',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.City',
      required: true,
      disabled: true,
      readonly: false,
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Cities,
      class: 'col-3'
    },
    {
      code: 'street',
      innerObjectName: 'regAddressObj',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.RegAddress',
      required: true,
      disabled: true,
      readonly: false,
      class: 'col-6'
    }
  ],
  [FullFormGroupKeys.FactAddress]: [
    {
      code: 'country',
      innerObjectName: 'factAddressObj',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.Country',
      required: true,
      disabled: false,
      readonly: false,
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Countries,
      class: 'col-3'
    },
    {
      code: 'city',
      innerObjectName: 'factAddressObj',
      objectName: 'applicant',
      type: EInputType.Select,
      placeholder: 'FullForm.Placeholder.City',
      required: true,
      disabled: false,
      readonly: false,
      selectEmittedValueType: ValueType.Object,
      optionsListName: OptionListNames.Cities,
      class: 'col-3'
    },
    {
      code: 'street',
      innerObjectName: 'factAddressObj',
      objectName: 'applicant',
      type: EInputType.Text,
      placeholder: 'FullForm.Placeholder.FactAddress',
      required: true,
      disabled: false,
      readonly: false,
      class: 'col-6'
    }
  ],
  [FullFormGroupKeys.DeclineReasons]: [
    {
      code: 'declineReason',
      type: EInputType.Select,
      placeholder: 'FullForm.DeclineReason',
      required: false,
      disabled: true,
      readonly: false,
      optionsListName: OptionListNames.DeclineReasons,
      class: 'col-8'
    }
  ]
};
