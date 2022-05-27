import { BaseFormField, EInputType, OptionListNames, RoleAuthority } from '@app/_models';
import { InputErrorKeys } from '@app/constants/validators-errors';

export enum DecisionMakingGroupKeys {
  ApplicantIncome = 'applicantIncome',
  ApplicantLoan = 'applicantLoan',
  ApplicantGuarantorLoan = 'applicantGuarantorLoan',
  CreditInfo = 'creditInfo',
  LimitUnder = 'limitUnder',
  DecisionMakerDecision = 'decisionMakerDecision',
  DeclineReason = 'declineReason',
  Comment = 'comment'
}

export const DECISION_MAKING_INCOME: BaseFormField[] = [
  {
    code: 'approvedIncome',
    type: EInputType.Text,
    placeholder: 'DecisionMaking.Placeholders.ApprovedIncome',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'decisionMakingIncome',
    type: EInputType.Text,
    placeholder: 'DecisionMaking.Placeholders.DecisionMakingIncome',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'totalJobExp',
    type: EInputType.Text,
    placeholder: 'DecisionMaking.Placeholders.TotalJobExp',
    required: true,
    disabled: false,
    readonly: false,
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: '^[0-9]+$'
      }
    ],
    class: 'col-3',
    visibleForRolesList: [RoleAuthority.DECISION_MAKER]
  },
  {
    code: 'shortFormIncome',
    type: EInputType.Text,
    placeholder: 'DecisionMaking.Placeholders.ShortFormIncome',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3'
  }
];

export const DECISION_MAKING_CREDIT_INFO: BaseFormField[] = [
  {
    code: 'isGraceInterest',
    objectName: 'chosenCreditInfo',
    type: EInputType.Checkbox,
    placeholder: 'DecisionMaking.Placeholders.GraceInterest',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'dirProvisionRateId',
    innerObjectName: 'dirProvisionRate',
    objectName: 'chosenCreditInfo',
    type: EInputType.Select,
    placeholder: 'DecisionMaking.Placeholders.ProvisionRate',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.ProvisionRate,
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

export const DECISION_MAKING_LIMIT_UNDER: BaseFormField[] = [
  {
    code: 'limitUnder',
    objectName: 'verification',
    type: EInputType.Text,
    placeholder: 'DecisionMaking.Placeholders.LimitUnder',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-3'
  }
];

export const DECISION_MAKING_DECISION_MAKER_DECISION: BaseFormField[] = [
  {
    code: 'dirDecisionMakerDecision',
    type: EInputType.Select,
    placeholder: 'DecisionMaking.Placeholders.Decision',
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.DecisionMakerDecisionList,
    class: 'col-4'
  }
];

export const DECISION_MAKING_DECLINE_REASON: BaseFormField[] = [
  {
    code: 'dirDecisionMakerDeclineReason',
    innerObjectName: 'dirDecisionMakerDeclineReason',
    objectName: 'verification',
    type: EInputType.Select,
    placeholder: 'DecisionMaking.Placeholders.DeclineReason',
    required: false,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.DecisionMakerDeclineReasonList,
    class: 'col-4'
  }
];

export const DECISION_MAKING_COMMENT: BaseFormField[] = [
  {
    code: 'comment',
    objectName: 'verification',
    type: EInputType.Text,
    placeholder: 'DecisionMaking.Placeholders.Comment',
    required: false,
    disabled: false,
    readonly: false,
    class: 'col-6',
    visibleForRolesList: [RoleAuthority.DECISION_MAKER]
  }
];
