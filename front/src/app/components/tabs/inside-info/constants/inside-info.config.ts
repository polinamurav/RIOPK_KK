import { BaseFormField, EInputType } from '@app/_models';
import { VkiAggregates } from '@app/_models/api-models/vki-aggregates';

export enum InsideInfoGroupKeys {
  RelatedPersons = 'relatedPersons',
  InternalLoanHistory = 'internalLoanHistory'
}

export const INSIDE_INFO_TITLES: Record<string, string> = {
  [InsideInfoGroupKeys.RelatedPersons]: 'InsideInfo.RelatedPersons',
  [InsideInfoGroupKeys.InternalLoanHistory]: 'InsideInfo.InternalLoanHistory'
};

export const INSIDE_INFO: BaseFormField[] = [
  {
    code: 'responseTimestamp',
    type: EInputType.Text,
    placeholder: 'InsideInfo.Placeholders.RequestDateAndTime',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3 pt-2'
  },
  {
    code: 'sumBalance',
    type: EInputType.Text,
    placeholder: 'InsideInfo.Placeholders.MonthlyInstallmentOnLoans',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3 pt-2'
  },
  {
    code: 'closeDate',
    type: EInputType.Text,
    placeholder: 'InsideInfo.Placeholders.NextPaymentnearestDate',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3 pt-2'
  }
];
