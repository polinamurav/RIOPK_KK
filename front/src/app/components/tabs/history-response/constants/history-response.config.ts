import { BaseFormField, EInputType } from '@app/_models';

export enum HistoryResponseGroupKeys {
  IndividualsInformation = 'IndividualsInformation',
  ObligationsTotalInfo = 'ObligationsTotalInfo'
}

export const HISTORY_RESPONSE_TITLES: Record<string, string> = {
  [HistoryResponseGroupKeys.IndividualsInformation]: 'HistoryResponse.GeneralizedDataOnIndividuals'
};

export const INDIVIDUALS_INFO: BaseFormField[] = [
  {
    code: 'dateOfInformationUpdate',
    type: EInputType.Date,
    placeholder: 'HistoryResponse.Placeholders.DateOfInformationUpdate',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'requestsCount',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.RequestsCount',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'numberOfReceivedLoans1to12month',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.NumberOfReceivedLoans1to12month',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3'
  }
  // {
  //   code: 'montlyLoanInstallment',
  //   type: EInputType.Text,
  //   placeholder: 'HistoryResponse.Placeholders.MontlyLoanInstallment',
  //   required: true,
  //   disabled: true,
  //   readonly: false,
  //   class: 'col-3'
  // }
];

export const ACRA_LOAN_AGGREGATES_INFO: BaseFormField[] = [
  {
    code: 'amountSum',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.Amount',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'remainderSum',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.Remainder',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'monthlyLoanPaymentSum',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.MonthlyLoanPayment',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'amountOfDepositSum',
    type: EInputType.Text,
    placeholder: 'HistoryResponse.Placeholders.AmountOfDeposit',
    required: false,
    disabled: true,
    readonly: false,
    class: 'col-3'
  }
];
