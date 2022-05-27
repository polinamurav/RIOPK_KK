import { BaseFormField, EInputType, ELocalNames, OptionListNames, ValueType } from '@app/_models';
import { IAmlFormField } from '@app/components/tabs/aml/constants/aml-form';

export enum EInsuranceFieldGroup {
  Options = 'options',
  Company = 'company',
  ProductName = 'productNames'
}

export enum EAccountNameColumn {
  GE = 'მიმდინარე ანგარიში',
  RU = 'Текущий счет'
}

export enum FinalDecisionGroupKeys {
  ChosenCreditInfo = 'chosenCreditInfo',
  ApprovedCreditConditions = 'approvedCreditConditions',
  Calculator = 'calculator',
  AvailableRefinancingOptions = 'availableRefinancingOptions',
  CalculatedCreditConditions = 'calculatedCreditConditions',
  SelectedLoanTerms = 'selectedLoanTerms',
  GraceInterest = 'graceInterest',
  AdditionalParameters = 'additionalParameters',
  FamilyInfo = 'familyInfo',
  ContactPersons = 'contactPersons',
  SelectingCardAccount = 'selectingCardAccount',
  SelectingCurrentAccount = 'selectingCurrentAccount',
  AccountForm = 'accountForm',
  Insurance = 'insurance'
}

export interface IInsuranceField extends BaseFormField {
  group?: EInsuranceFieldGroup;
}

export const FINAL_DECISION_TITLES: Record<string, string> = {
  [FinalDecisionGroupKeys.ChosenCreditInfo]: 'FinalDecision.Titles.ChosenCreditInfo',
  [FinalDecisionGroupKeys.ApprovedCreditConditions]: 'FinalDecision.Titles.ApprovedCreditConditions',
  [FinalDecisionGroupKeys.Calculator]: 'FinalDecision.Titles.Calculator',
  [FinalDecisionGroupKeys.AvailableRefinancingOptions]: 'FinalDecision.Titles.Refinance',
  [FinalDecisionGroupKeys.CalculatedCreditConditions]: 'FinalDecision.Titles.Calculated',
  [FinalDecisionGroupKeys.SelectedLoanTerms]: 'FinalDecision.Titles.SelectedLoanTerms',
  [FinalDecisionGroupKeys.AdditionalParameters]: 'FinalDecision.Titles.AdditionalParameters',
  [FinalDecisionGroupKeys.FamilyInfo]: 'FinalDecision.Titles.FamilyInformation',
  [FinalDecisionGroupKeys.ContactPersons]: 'FinalDecision.Titles.ContactPersons',
  [FinalDecisionGroupKeys.SelectingCardAccount]: 'FinalDecision.Titles.SelectingCardAccount',
  [FinalDecisionGroupKeys.SelectingCurrentAccount]: 'FinalDecision.Titles.SelectingCurrentAccount',
  [FinalDecisionGroupKeys.AccountForm]: 'FinalDecision.Titles.ChosenCard',
  [FinalDecisionGroupKeys.Insurance]: 'FinalDecision.Titles.Insurance'
};

export const CALCULATE_FORM_CONFIG: BaseFormField[] = [
  {
    code: 'creditSum',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.LoanAmount',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'creditTerm',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.Term',
    required: false,
    disabled: false,
    readonly: false,
    pattern: /^[0-9]\d*$/,
    class: 'col-4'
  },
  {
    code: 'gracePeriod',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.GracePeriod',
    required: false,
    disabled: false,
    readonly: false,
    pattern: /^[0-9]\d*$/,
    class: 'col-4'
  },
  {
    code: 'rateParam',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.Rate',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'issueFeeParam',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.IssuanceFee',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'overpayPrepaymentRateParam',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.EarlyRepaymentFee',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'isWithRef',
    type: EInputType.Inner,
    placeholder: 'isWithRef',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
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

export const INSURANCE_FORM: IInsuranceField[] = [
  {
    code: 'insuranceTypeId',
    objectName: 'insuranceType',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.InsuranceOption',
    required: false,
    readonly: false,
    disabled: false,
    optionsListName: OptionListNames.InsuranceProduct,
    propertyName: ELocalNames.NameRu,
    class: 'col-3',
    group: EInsuranceFieldGroup.Options
  },
  {
    code: 'companyName',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.CompanyName',
    required: false,
    readonly: false,
    disabled: false,
    optionsListName: OptionListNames.InsuranceCompanies,
    selectEmittedValueType: ValueType.Object,
    propertyName: 'companyName',
    class: 'col-3',
    group: EInsuranceFieldGroup.Company,
    compareWithProp: 'companyName'
  },
  {
    code: 'productName',
    type: EInputType.Select,
    placeholder: 'FinalDecision.Placeholders.ProductName',
    required: false,
    readonly: false,
    disabled: false,
    optionsListName: OptionListNames.InsuranceProductName,
    selectEmittedValueType: ValueType.Object,
    propertyName: 'insuranceProductName',
    class: 'col-3',
    group: EInsuranceFieldGroup.ProductName,
    compareWithProp: 'insuranceProductName'
  },
  {
    code: 'insuranceBrokerage',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.InsuranceFee',
    required: false,
    readonly: false,
    disabled: true,
    class: 'col-3'
  }
];
