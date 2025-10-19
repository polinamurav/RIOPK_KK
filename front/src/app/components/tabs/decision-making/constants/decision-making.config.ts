import { BaseFormField, EInputType, OptionListNames, RoleAuthority } from '@app/_models';
import { InputErrorKeys, PatternsEnum } from '@app/constants/validators-errors';
// import { InputErrorKeys } from '@app/constants/validators-errors';

export enum DecisionMakingGroupKeys {
  BasicConditionsFinancing = 'basicConditionsFinancing',
  SuspensiveConditions = 'suspensiveConditions',
  RecalculateConditions = 'RecalculateConditions',
  Decision = 'decision',
  DecisionCreditForm = 'decisionCreditForm'
}

export const DECISION_MAKING_TITLES: Record<string, string> = {
  [DecisionMakingGroupKeys.BasicConditionsFinancing]: 'DecisionMaking.Titles.BasicConditionsFinancing',
  [DecisionMakingGroupKeys.SuspensiveConditions]: 'DecisionMaking.Titles.SuspensiveConditions',
  [DecisionMakingGroupKeys.RecalculateConditions]: 'DecisionMaking.Titles.RecalculateConditions',
  [DecisionMakingGroupKeys.Decision]: 'DecisionMaking.Titles.Decision'
};

export const DECISION_CREDIT_FORM: BaseFormField[] = [
  {
    code: 'creditAmount',
    type: EInputType.Text,
    placeholder: 'DecisionMaking.TableHeaders.Amount',
    required: false,
    disabled: false,
    isVisible: true,
    readonly: false,
    class: 'col-3',
    maxLength: 12,
    customValidators: [
      {
        errorKey: InputErrorKeys.Double,
        pattern: PatternsEnum.Double
      }
    ]
  },
  {
    code: 'topUpRemains',
    type: EInputType.Text,
    placeholder: 'Сумма кредита под top-up',
    required: false,
    disabled: true,
    isVisible: false,
    readonly: true,
    class: 'col-3',
    maxLength: 12
  },
  {
    code: 'rate',
    type: EInputType.Text,
    placeholder: 'FinalDecision.Placeholders.Rate',
    required: false,
    disabled: true,
    isVisible: true,
    readonly: false,
    class: 'col-3',
    maxLength: 12
    // customValidators: [
    //   {
    //     errorKey: InputErrorKeys.Double,
    //     pattern: PatternsEnum.Double
    //   }
    // ]
  },
  {
    code: 'creditTerm',
    type: EInputType.Text,
    placeholder: 'DecisionMaking.TableHeaders.CreditTerm',
    required: false,
    disabled: false,
    isVisible: true,
    readonly: false,
    class: 'col-3',
    maxLength: 3,
    customValidators: [
      {
        errorKey: InputErrorKeys.OnlyNumbersPattern,
        pattern: PatternsEnum.OnlyNumbersPattern
      }
    ]
  }
  // {
  //   code: 'dirCurrencyId',
  //   type: EInputType.Select,
  //   placeholder: 'DecisionMaking.TableHeaders.Currency',
  //   required: false,
  //   disabled: false,
  //   readonly: false,
  //   maxLength: 255,
  //   class: 'col-3',
  //   optionsListName: OptionListNames.Currencies
  // }
];

export const DECISION_INFO: BaseFormField[] = [
  {
    code: 'TypeOfDecisionId',
    innerObjectName: 'dirTypeOfDecision',
    objectName: '',
    type: EInputType.Select,
    placeholder: 'DecisionMaking.Placeholders.TypeOfDecision', // Тип решения
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.TypeOfDecision,
    class: 'col-3'
  },
  {
    code: 'DecisionId',
    innerObjectName: 'dirDecision',
    objectName: '',
    type: EInputType.Select,
    placeholder: 'DecisionMaking.Placeholders.Decision', // Решение
    required: true,
    disabled: false,
    readonly: false,
    optionsListName: OptionListNames.DecisionMakerDecisionList,
    class: 'col-3'
  },
  {
    code: 'comment',
    type: EInputType.Textarea,
    placeholder: 'DecisionMaking.Placeholders.Comment', // Комментарий
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 255,
    class: 'col-6'
  }
];

// export const DECISION_MAKING_INCOME: BaseFormField[] = [
//   {
//     code: 'approvedIncome',
//     type: EInputType.Text,
//     placeholder: 'DecisionMaking.Placeholders.ApprovedIncome',
//     required: true,
//     disabled: true,
//     readonly: false,
//     class: 'col-3'
//   },
//   {
//     code: 'decisionMakingIncome',
//     type: EInputType.Text,
//     placeholder: 'DecisionMaking.Placeholders.DecisionMakingIncome',
//     required: true,
//     disabled: true,
//     readonly: false,
//     class: 'col-3'
//   },
//   {
//     code: 'totalJobExp',
//     type: EInputType.Text,
//     placeholder: 'DecisionMaking.Placeholders.TotalJobExp',
//     required: true,
//     disabled: false,
//     readonly: false,
//     customValidators: [
//       {
//         errorKey: InputErrorKeys.OnlyNumbersPattern,
//         pattern: '^[0-9]+$'
//       }
//     ],
//     class: 'col-3',
//     visibleForRolesList: [RoleAuthority.DECISION_MAKER]
//   },
//   {
//     code: 'shortFormIncome',
//     type: EInputType.Text,
//     placeholder: 'DecisionMaking.Placeholders.ShortFormIncome',
//     required: true,
//     disabled: true,
//     readonly: false,
//     class: 'col-3'
//   }
// ];

// export const DECISION_MAKING_CREDIT_INFO: BaseFormField[] = [
//   {
//     code: 'isGraceInterest',
//     objectName: 'chosenCreditInfo',
//     type: EInputType.Checkbox,
//     placeholder: 'DecisionMaking.Placeholders.GraceInterest',
//     required: false,
//     disabled: false,
//     readonly: false,
//     class: 'col-4'
//   },
//   {
//     code: 'dirProvisionRateId',
//     innerObjectName: 'dirProvisionRate',
//     objectName: 'chosenCreditInfo',
//     type: EInputType.Select,
//     placeholder: 'DecisionMaking.Placeholders.ProvisionRate',
//     required: false,
//     disabled: false,
//     readonly: false,
//     optionsListName: OptionListNames.ProvisionRate,
//     class: 'col-3'
//   },
//   {
//     code: 'isWithRef',
//     type: EInputType.Inner,
//     placeholder: 'isWithRef',
//     required: false,
//     disabled: false,
//     readonly: false,
//     class: 'col-3'
//   }
// ];

// export const DECISION_MAKING_LIMIT_UNDER: BaseFormField[] = [
//   {
//     code: 'limitUnder',
//     objectName: 'verification',
//     type: EInputType.Text,
//     placeholder: 'DecisionMaking.Placeholders.LimitUnder',
//     required: false,
//     disabled: false,
//     readonly: false,
//     class: 'col-3'
//   }
// ];

// export const DECISION_MAKING_DECISION_MAKER_DECISION: BaseFormField[] = [
//   {
//     code: 'dirDecisionMakerDecision',
//     type: EInputType.Select,
//     placeholder: 'DecisionMaking.Placeholders.Decision',
//     required: true,
//     disabled: false,
//     readonly: false,
//     optionsListName: OptionListNames.DecisionMakerDecisionList,
//     class: 'col-4'
//   }
// ];

// export const DECISION_MAKING_DECLINE_REASON: BaseFormField[] = [
//   {
//     code: 'dirDecisionMakerDeclineReason',
//     innerObjectName: 'dirDecisionMakerDeclineReason',
//     objectName: 'verification',
//     type: EInputType.Select,
//     placeholder: 'DecisionMaking.Placeholders.DeclineReason',
//     required: false,
//     disabled: false,
//     readonly: false,
//     optionsListName: OptionListNames.DecisionMakerDeclineReasonList,
//     class: 'col-4'
//   }
// ];

// export const DECISION_MAKING_COMMENT: BaseFormField[] = [
//   {
//     code: 'comment',
//     objectName: 'verification',
//     type: EInputType.Text,
//     placeholder: 'DecisionMaking.Placeholders.Comment',
//     required: false,
//     disabled: false,
//     readonly: false,
//     class: 'col-6',
//     visibleForRolesList: [RoleAuthority.DECISION_MAKER]
//   }
// ];
