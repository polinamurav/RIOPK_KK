import { BaseFormField, EInputType, OptionListNames } from '@app/_models';

export enum AcceptanceGroupKeys {
  FinalCreditInfo = 'finalCreditInfo',
  AdditionalParameters = 'additionalParameters',
  AccountName = 'accountName',
  Result = 'result',
  loanAgreement = 'loanAgreement'
}

export const ACCEPTANCE_TITLES: Record<string, string> = {
  [AcceptanceGroupKeys.FinalCreditInfo]: 'Acceptance.FinalCreditInfo',
  [AcceptanceGroupKeys.AdditionalParameters]: 'Acceptance.AdditionalParameters',
  [AcceptanceGroupKeys.AccountName]: 'Acceptance.AccountName'
};

export const ACCEPTANCE_ADDITIONAL_PARAMETERS: BaseFormField[] = [
  {
    code: 'dirScheduleTypeId',
    objectName: 'dirScheduleType',
    type: EInputType.Select,
    placeholder: 'Acceptance.Placeholders.ScheduleType',
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
    placeholder: 'Acceptance.Placeholders.PaymentDay',
    required: true,
    disabled: true,
    readonly: false,
    optionsListName: OptionListNames.ScheduleFrequencies,
    class: 'col-3'
  },
  {
    code: 'paymentDay',
    type: EInputType.CustomSelect,
    placeholder: 'Acceptance.Placeholders.PaymentFirstDay',
    required: true,
    disabled: true,
    readonly: false,
    optionsListName: OptionListNames.ProductToPaymentDay,
    customListValueName: 'paymentDay',
    propertyName: 'paymentDay',
    class: 'col-3'
  }
];

export const ACCEPTANCE_ACCOUNT_NAME: BaseFormField[] = [
  {
    code: 'cardAccNum',
    type: EInputType.Text,
    placeholder: 'Acceptance.Placeholders.CardAccNum',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-5'
  },
  {
    code: 'accNum',
    type: EInputType.Text,
    placeholder: 'Acceptance.Placeholders.CardAccNum',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-5'
  },
  {
    code: 'cardAccountIban',
    type: EInputType.Text,
    placeholder: 'Acceptance.Placeholders.CardAccNum',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-5'
  },
  {
    code: 'currAccountIban',
    type: EInputType.Text,
    placeholder: 'Acceptance.Placeholders.CardAccNum',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-5'
  }
];

export const ACCEPTANCE_RESULT: BaseFormField[] = [
  {
    code: 'accepterDecision',
    type: EInputType.Select,
    placeholder: 'Acceptance.Placeholders.Result',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.AccepterDecisionList,
    class: 'col-4',
    allowEmptyValue: false
  },
  {
    code: 'comment',
    type: EInputType.Textarea,
    placeholder: 'DecisionMaking.Placeholders.Comment', // Комментарий ОПЗ
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 500,
    class: 'col-6'
  }
];

export const LOAN_AGREEMENT_INFO: BaseFormField[] = [
  {
    code: 'refnumber', // Ссылочный номер кредита
    type: EInputType.Text,
    placeholder: 'Acceptance.Placeholders.CreditReferenceNumber',
    required: false,
    disabled: true,
    readonly: true,
    class: 'col-2'
  },
  {
    code: 'contract', // Код договора кредита
    type: EInputType.Text,
    placeholder: 'Acceptance.Placeholders.TheCodeOfTheLoanAgreement',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-2'
  },
  {
    code: 'pldRefNumber', // Ссылочный номер залога
    type: EInputType.Text,
    placeholder: 'Acceptance.Placeholders.TheReferenceNumberOfTheDeposit',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-2'
  }
];
