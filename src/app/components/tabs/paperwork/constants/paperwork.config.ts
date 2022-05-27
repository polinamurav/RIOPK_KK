import { BaseFormField, EInputType, OptionListNames } from '@app/_models';

export enum PaperworkGroupKeys {
  FinalCreditInfo = 'finalCreditInfo',
  AdditionalParameters = 'additionalParameters',
  AccountName = 'accountName',
  Result = 'result'
}

export const PAPERWORK_TITLES: Record<string, string> = {
  [PaperworkGroupKeys.FinalCreditInfo]: 'Paperwork.FinalCreditInfo',
  [PaperworkGroupKeys.AdditionalParameters]: 'Paperwork.AdditionalParameters',
  [PaperworkGroupKeys.AccountName]: 'Paperwork.AccountName'
};

export const PAPERWORK_ADDITIONAL_PARAMETERS: BaseFormField[] = [
  {
    code: 'dirScheduleTypeId',
    objectName: 'dirScheduleType',
    type: EInputType.Select,
    placeholder: 'Paperwork.Placeholders.ScheduleType',
    required: true,
    disabled: true,
    readonly: false,
    optionsListName: OptionListNames.ScheduleTypes,
    class: 'col-3'
  },
  {
    code: 'dirScheduleFrequencyId',
    objectName: 'dirScheduleFrequency',
    type: EInputType.Select,
    placeholder: 'Paperwork.Placeholders.ScheduleFrequency',
    required: true,
    disabled: true,
    readonly: false,
    optionsListName: OptionListNames.ScheduleFrequencies,
    class: 'col-3'
  },
  {
    code: 'dirEnsureTypeId',
    objectName: 'dirEnsureType',
    type: EInputType.Select,
    placeholder: 'Paperwork.Placeholders.EnsureType',
    required: true,
    disabled: true,
    readonly: false,
    optionsListName: OptionListNames.EnsureTypes,
    class: 'col-3'
  },
  // {
  //   code: 'dirIssueTypeId',
  //   objectName: 'dirIssueType',
  //   type: EInputType.Select,
  //   placeholder: 'Paperwork.Placeholders.IssueType',
  //   required: true,
  //   disabled: true,
  //   readonly: false,
  //   optionsListName: OptionListNames.IssueTypes,
  //   class: 'col-3'
  // },
  {
    code: 'paymentDay',
    type: EInputType.CustomSelect,
    placeholder: 'Paperwork.Placeholders.PaymentDay',
    required: true,
    disabled: true,
    readonly: false,
    optionsListName: OptionListNames.ProductToPaymentDay,
    customListValueName: 'paymentDay',
    propertyName: 'paymentDay',
    class: 'col-3'
  },
  {
    code: 'secondPaymentDay',
    type: EInputType.CustomSelect,
    placeholder: 'Paperwork.Placeholders.SecondPaymentDay',
    required: true,
    disabled: true,
    readonly: false,
    optionsListName: OptionListNames.ProductToPaymentDay,
    customListValueName: 'paymentDay',
    propertyName: 'paymentDay',
    class: 'col-3'
  },
  {
    code: 'paymentDay',
    type: EInputType.CustomSelect,
    placeholder: 'Paperwork.Placeholders.CalculationDay',
    required: true,
    disabled: true,
    readonly: false,
    optionsListName: OptionListNames.ProductToPaymentDay,
    customListValueName: 'paymentDay',
    propertyName: 'paymentDay',
    class: 'col-3'
  }
];

export const PAPERWORK_ACCOUNT_NAME: BaseFormField[] = [
  {
    code: 'cardAccNum',
    type: EInputType.Text,
    placeholder: 'Paperwork.Placeholders.CardAccNum',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-5'
  },
  {
    code: 'accNum',
    type: EInputType.Text,
    placeholder: 'Paperwork.Placeholders.CardAccNum',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-5'
  },
  {
    code: 'cardAccountIban',
    type: EInputType.Text,
    placeholder: 'Paperwork.Placeholders.CardAccNum',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-5'
  },
  {
    code: 'currAccountIban',
    type: EInputType.Text,
    placeholder: 'Paperwork.Placeholders.CardAccNum',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-5'
  }
];

export const PAPERWORK_RESULT: BaseFormField[] = [
  {
    code: 'paperworkDecision',
    type: EInputType.Select,
    placeholder: 'Paperwork.Placeholders.Result',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.PaperworkDecisionList,
    class: 'col-5'
  }
];
