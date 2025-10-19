import { BaseFormField, EInputType, OptionListNames } from '@app/_models';

export enum BorrowersGroupKeys {
  Management = 'management',
  LastWorksExpirence = 'lastWorksExpirence',
  JobPosition = 'jobPosition',
  CustomerRequests = 'customerRequests',
  EmployersApplications = 'employersApplications',
  BlackList = 'blackList'
}

export const BORROWERS_TITLES: Record<string, string> = {
  [BorrowersGroupKeys.Management]: 'Borrowers.Management',
  [BorrowersGroupKeys.LastWorksExpirence]: 'Borrowers.LastWorksExpirence',
  [BorrowersGroupKeys.JobPosition]: 'Borrowers.JobPosition',
  [BorrowersGroupKeys.CustomerRequests]: 'Borrowers.CustomerRequests',
  [BorrowersGroupKeys.EmployersApplications]: 'Borrowers.EmployersApplications',
  [BorrowersGroupKeys.BlackList]: 'Borrowers.BlackList'
};

export const BORROWER_FORM: BaseFormField[] = [
  {
    code: 'verifierDecisionId', // TODO change
    // innerObjectName: 'product',
    // objectName: 'requestedCreditInfo',
    type: EInputType.Select,
    placeholder: 'Borrowers.Placeholders.DecisionOfOPZApplication', // Решение ОПЗ по заявке
    required: true,
    disabled: false,
    readonly: true,
    optionsListName: OptionListNames.VerifierDecisionList, // TODO change
    class: 'col-3',
    allowEmptyValue: false
  },
  {
    code: 'verifierDeclineReasonId', // TODO change
    // innerObjectName: 'product',
    // objectName: 'requestedCreditInfo',
    type: EInputType.Select,
    placeholder: 'Borrowers.Placeholders.DeclineReason', // Причина отказа
    required: true,
    disabled: false,
    readonly: true,
    optionsListName: OptionListNames.VerifierDeclineReasons, // TODO change
    class: 'col-6',
    allowEmptyValue: false
  },
  {
    code: 'comment',
    type: EInputType.Textarea,
    placeholder: 'Borrowers.Placeholders.CommentOPZ', // Комментарий ОПЗ
    required: false,
    disabled: false,
    readonly: false,
    maxLength: 500,
    class: 'col-6'
  }
];
