import { BaseFormField, EInputType, OptionListNames } from '@app/_models';
import { IAmlFormField } from '@app/components/tabs/aml/constants/aml-form';
import { InputErrorKeys, PatternsEnum } from '@app/constants/validators-errors';
import { CommunicationOwnerType, CommunicationType } from '@app/_models/api-models/communication-get-dto';
import { getMinDate } from '@app/services/util/getMinDate';

export enum EInsuranceFieldGroup {
  Options = 'options',
  Company = 'company',
  ProductName = 'productNames'
}

export enum EAccountNameColumn {
  AM = 'მიმდინარე ანგარიში',
  RU = 'Текущий счет'
}

export enum FinalDecisionGroupKeys {
  ChosenCreditInfo = 'chosenCreditInfo',
  CreditDetails = 'сreditDetails',
  AdditionalInfo = 'AdditionalInfo',
  ApprovedCreditConditions = 'approvedCreditConditions',
  Calculator = 'calculator',
  CalculatedCreditConditions = 'calculatedCreditConditions',
  SelectedLoanTerms = 'selectedLoanTerms',
  SuspensiveConditions = 'suspensiveConditions',
  SelectingCardAccount = 'selectingCardAccount',
  Insurance = 'insurance',
  NewAccount = 'newAccount',
  ConnectToClient = 'ConnectToClient',
  ConnectToBank = 'ConnectToBank',

  AvailableRefinancingOptions = 'availableRefinancingOptions',
  GraceInterest = 'graceInterest',
  AdditionalParameters = 'additionalParameters',
  FamilyInfo = 'familyInfo',
  ContactPersons = 'contactPersons',
  SelectingCurrentAccount = 'selectingCurrentAccount',
  AccountForm = 'accountForm'
}

export interface IInsuranceField extends BaseFormField {
  group?: EInsuranceFieldGroup;
}

export const FINAL_DECISION_TITLES: Record<string, string> = {
  [FinalDecisionGroupKeys.ChosenCreditInfo]: 'FinalDecision.Titles.ChosenCreditInfo', // * Предварительно выбранные условия кредитования

  [FinalDecisionGroupKeys.CreditDetails]: 'FinalDecision.Titles.CreditDetails', // * Обязательства

  [FinalDecisionGroupKeys.ApprovedCreditConditions]: 'FinalDecision.Titles.FinalMatrix', // * Утвержденные условия кредитования

  [FinalDecisionGroupKeys.Calculator]: 'FinalDecision.Titles.Calculator', // * Калькулятор предложения

  [FinalDecisionGroupKeys.CalculatedCreditConditions]: 'FinalDecision.Titles.Calculated', // * Рассчитанные условия кредитования

  [FinalDecisionGroupKeys.SelectedLoanTerms]: 'FinalDecision.Titles.SelectedLoanTerms', // * Выбранные условия кредитования

  [FinalDecisionGroupKeys.SuspensiveConditions]: 'FinalDecision.Titles.SuspensiveConditions', // * Отлагательные условия

  [FinalDecisionGroupKeys.SelectingCardAccount]: 'FinalDecision.Titles.SelectingCardAccount', // * Выбор счёта/карты

  [FinalDecisionGroupKeys.Insurance]: 'FinalDecision.Titles.Insurance', // * Страхование
  [FinalDecisionGroupKeys.AdditionalInfo]: 'FinalDecision.Titles.AdditionalInfo', // * AdditionalInfo

  [FinalDecisionGroupKeys.ConnectToClient]: 'FinalDecision.Titles.ConnectToClient', // * связиь с клиентом

  [FinalDecisionGroupKeys.NewAccount]: 'FinalDecision.Titles.NewAccount', // * новый текущий счет

  [FinalDecisionGroupKeys.AvailableRefinancingOptions]: 'FinalDecision.Titles.Refinance',
  [FinalDecisionGroupKeys.AdditionalParameters]: 'FinalDecision.Titles.AdditionalParameters',
  [FinalDecisionGroupKeys.FamilyInfo]: 'FinalDecision.Titles.FamilyInformation',
  [FinalDecisionGroupKeys.ContactPersons]: 'FinalDecision.Titles.ContactPersons',
  [FinalDecisionGroupKeys.SelectingCurrentAccount]: 'FinalDecision.Titles.SelectingCurrentAccount',
  [FinalDecisionGroupKeys.AccountForm]: 'FinalDecision.Titles.ChosenCard'
};

// * Калькулятор предложения
export const CALCULATE_FORM_CONFIG: BaseFormField[] = [
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
    type: EInputType.Text,
    placeholder: 'FullForm.Placeholder.LoanAmount',
    required: true,
    disabled: false,
    readonly: false,
    isVisible: true,
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
        pattern: PatternsEnum.OnlyNumbersPattern
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
    disabled: false,
    readonly: false,
    isVisible: true,
    optionsListName: OptionListNames.YesOrNoTypes,
    class: 'col-3'
  }
];

// * Страхование
export const INSURANCE_FORM: IInsuranceField[] = [
  // {
  //   code: 'VoluntaryInsurance',
  //   objectName: 'insuranceType',
  //   type: EInputType.Select,
  //   placeholder: 'FinalDecision.Placeholders.VoluntaryInsurance',
  //   required: false,
  //   readonly: false,
  //   disabled: false,
  //   optionsListName: OptionListNames.YesOrNoTypes,
  //   propertyName: ELocalNames.NameRu,
  //   class: 'col-3',
  // },

  // Периодичность кредитного графика
  {
    code: 'dirScheduleFrequency',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.ScheduleFrequency',
    required: false,
    readonly: true,
    disabled: true,
    class: 'col-3',
    optionsListName: OptionListNames.ScheduleFrequencies
    // propertyName: ELocalNames.NameRu      Если в параметрах есть свойство [valueType]= .... то там язык берется с обьекта по id.
  },

  {
    code: 'firstPaymentDate',
    type: EInputType.Date,
    placeholder: 'FinalDecision.Placeholders.FirstRepaymentDay',
    required: false,
    readonly: false,
    disabled: false,
    minDate: getMinDate(new Date(), 1),
    class: 'col-3'
  }
];

export const INSURANCE_NEW_ACCOUNT_FORM: IInsuranceField[] = [
  {
    code: 'dirAccountTypeId',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.AccountType', // вид счета
    required: false,
    readonly: false,
    disabled: false,
    optionsListName: OptionListNames.AccountType,
    // propertyName: ELocalNames.NameRu,
    class: 'col-4',
    isVisible: true
  },
  {
    code: 'dirCurrencyId',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.AccountCurrency', // валюта счета
    required: false,
    readonly: false,
    disabled: true,
    optionsListName: OptionListNames.Currencies,
    // propertyName: ELocalNames.NameRu,
    class: 'col-4',
    isVisible: false
  },

  {
    code: 'dirPaymentCardId',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.CardType', // тип карты
    required: false,
    readonly: false,
    disabled: false,
    optionsListName: OptionListNames.PaymentCards,
    // propertyName: ELocalNames.NameRu,
    class: 'col-4',
    isVisible: false
  },
  {
    code: 'isMarketing',
    type: EInputType.Select,
    placeholder: 'Маркетинговые и/или другие услуги', // Маркетинговые и/или другие услуги
    required: false,
    readonly: false,
    disabled: false,
    optionsListName: OptionListNames.YesOrNoTypes,
    // propertyName: ELocalNames.NameRu,
    class: 'col-3',
    isVisible: false
  },
  {
    code: 'dirFeeTermTypeId',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.ComissionType', // вид комиссия
    required: false,
    readonly: false,
    disabled: false,
    optionsListName: OptionListNames.FeeTermType,
    // propertyName: ELocalNames.NameRu,
    class: 'col-4',
    isVisible: false
  }
];

export const GRACE_INTEREST: BaseFormField[] = [
  {
    code: 'isGraceInterest',
    type: EInputType.Checkbox,
    placeholder: 'FinalDecision.Labels.GraceInterestPaymentPeriod',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  }
];

export const ADDITIONAL_PARAMETERS_CONFIG: BaseFormField[] = [
  {
    code: 'dirScheduleTypeId',
    objectName: 'dirScheduleType',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.ScheduleType',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.ScheduleTypes,
    class: 'col-4'
  },
  {
    code: 'dirScheduleFrequencyId',
    objectName: 'dirScheduleFrequency',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.ScheduleFrequency',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.ScheduleFrequencies,
    class: 'col-4'
  },
  {
    code: 'dirEnsureTypeId',
    objectName: 'dirEnsureType',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.EnsureType',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.EnsureTypes,
    class: 'col-4'
  },
  // {
  //   code: 'dirIssueTypeId',
  //   objectName: 'dirIssueType',
  //   type: EInputType.Select,
  //   placeholder: 'FinalDecision.Placeholders.IssueType',
  //   required: true,
  //   disabled: false,
  //   readonly: false,
  //   optionsListName: OptionListNames.IssueTypes,
  //   class: 'col-3'
  // },
  {
    code: 'paymentDay',
    type: EInputType.CustomSelect,
    placeholder: 'FinalDecision.Placeholders.PaymentDay',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.ProductToPaymentDay,
    customListValueName: 'paymentDay',
    propertyName: 'paymentDay',
    class: 'col-4'
  },
  {
    code: 'secondPaymentDay',
    type: EInputType.CustomSelect,
    placeholder: 'FinalDecision.Placeholders.SecondPaymentDay',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.ProductToPaymentDay,
    customListValueName: 'paymentDay',
    propertyName: 'paymentDay',
    class: 'col-4'
  },
  {
    code: 'paymentDay',
    type: EInputType.CustomSelect,
    placeholder: 'FinalDecision.Placeholders.CalculationDay',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.ProductToPaymentDay,
    customListValueName: 'paymentDay',
    propertyName: 'paymentDay',
    class: 'col-4'
  }
];

export const FAMILY_INFO_FORM_CONFIG: BaseFormField[] = [
  {
    code: 'maritalStatusId',
    objectName: 'maritalStatus',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.MaritalStatus',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.MaritalStatuses,
    class: 'col-3'
  },
  {
    code: 'spousePin',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.SpousePersonalNumber',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 11,
    class: 'col-3'
  },
  {
    code: 'spouseFirstName',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.SpouseName',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'spouseLastName',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.SpouseLastName',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3'
  }
];

export const ACCOUNT_FORM: IAmlFormField[] = [
  {
    code: 'isNewCardOrder',
    type: EInputType.Checkbox,
    placeholder: 'FinalDecision.Labels.NewCard',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'isNewInstantCardOrder',
    type: EInputType.Checkbox,
    placeholder: 'FinalDecision.Labels.NewInstantCard',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'nameOnCard',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.NameOnCard',
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 21,
    class: 'col-3'
  },
  {
    code: 'cardAccNum',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.VisaDebitInstant',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'cardNumber',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.CardAccount',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'isGamingSite',
    type: EInputType.Checkbox,
    placeholder: 'FinalDecision.Labels.GamblingSitesUsage',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'isNewAccOrder',
    type: EInputType.Checkbox,
    placeholder: 'FinalDecision.Labels.NewAccount',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  }
];

export const CommunicationAddressOptions = [
  { id: 'factAddress', nameRu: 'Фактический адрес', name: 'Фактический адрес', nameAm: 'Փաստացի բնակության հասցե' },
  { id: 'regAddress', nameRu: 'Адрес регистрации', name: 'Адрес регистрации', nameAm: 'Հաշվառման հասցե' }
];

export const initialCommunicationConfig = {
  [CommunicationOwnerType.APPLICATION]: [
    {
      communicationType: CommunicationType.BANK,
      data: null
    },
    {
      communicationType: CommunicationType.STATEMENT,
      data: null
    }
  ],
  [CommunicationOwnerType.ACCOUNT]: [
    {
      communicationType: CommunicationType.BANK,
      data: null
    },
    {
      communicationType: CommunicationType.STATEMENT,
      data: null
    }
  ]
};
