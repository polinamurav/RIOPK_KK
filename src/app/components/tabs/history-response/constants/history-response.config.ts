import {BaseFormField, EInputType} from "@app/_models";

export enum HistoryResponseGroupKeys {
  ScoringInformation = 'scoringInformation',
}

export const HISTORY_RESPONSE_TITLES: Record<string, string> = {
  [HistoryResponseGroupKeys.ScoringInformation]: 'HistoryResponse.ScoringInformation',
};

export const HISTORY_RESPONSE_SCORING_INFO: BaseFormField[] = [
  {
    code: 'score',
    objectName: 'pinCreditInfoResponse',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.Score',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'probabilityOfDefault',
    objectName: 'pinCreditInfoResponse',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.ProbabilityOfDefault',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-4'
  },
  {
    code: 'riskGrade',
    objectName: 'pinCreditInfoResponse',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.RiskGrade',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-4'
  }
];
