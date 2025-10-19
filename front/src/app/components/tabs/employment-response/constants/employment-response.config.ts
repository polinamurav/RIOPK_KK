import { BaseFormField, EInputType } from '@app/_models';

export enum EmploymentResponseGroupKeys {
  GeneralInformation = 'generalInformation'
}

export const GENERAL_RESPONSE_TITLES: Record<string, string> = {
  [EmploymentResponseGroupKeys.GeneralInformation]: 'EmploymentResponseGroupKeys.generalInformation'
};

export const GENERAL_INFO: BaseFormField[] = [
  {
    code: 'totalNetIncomeNorq',
    type: EInputType.Text,
    placeholder: 'Employment.Placeholders.NorkAverageSalary',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'totalNetIncome6M',
    type: EInputType.Text,
    placeholder: 'Employment.Placeholders.EkengAverageSalary',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'averageSalaryOnBankAccounts', // TODO ROmanovski: add 'code' name when rest api is ready
    type: EInputType.Text,
    placeholder: 'Employment.Placeholders.AverageSalaryOnBankAccounts',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3'
  },
  {
    code: 'numberOfMonthsOfReceivingSalaryOnBankAccounts', // TODO ROmanovski: add 'code' name when rest api is ready
    type: EInputType.Text,
    placeholder: 'Employment.Placeholders.NumberOfMonthsOfReceivingSalaryOnBankAccounts',
    required: true,
    disabled: true,
    readonly: false,
    class: 'col-3'
  }
];
