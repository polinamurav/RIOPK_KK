import { EInputType, ELocalNames, ProductRes } from '@app/_models';

export enum EInsuranceFieldGroup {
  Options = 'options',
  Protection = 'protection',
  Company = 'company'
}

export interface IInsuranceCreditOptions {
  creditAmount: number;
  creditTerm: number;
  product: ProductRes;
}

// export const INSURANCE_FORM: IInsuranceField[] = [
//   {
//     code: 'insuranceTypeId',
//     type: EInputType.Select,
//     placeholder: 'Опция страхования',
//     class: 'col-4  mr-70',
//     required: false,
//     disabled: false,
//     optionsListName: 'insuranceType',
//     group: EInsuranceFieldGroup.Options
//   },
//   {
//     code: 'insuranceCompanyId',
//     type: EInputType.Select,
//     placeholder: 'Страховая компания',
//     class: 'col-4',
//     required: true,
//     disabled: false,
//     optionsListName: 'insuranceCompany',
//     propertyName: 'name',
//     group: EInsuranceFieldGroup.Company
//   },
//   {
//     code: 'insuranceCoverage',
//     type: EInputType.Text,
//     placeholder: 'Страховая сумма, GEL',
//     class: 'col-4',
//     required: true,
//     readonly: true,
//     disabled: false,
//     group: EInsuranceFieldGroup.Company
//   },
//   {
//     code: 'insuranceBrokerage',
//     type: EInputType.Text,
//     placeholder: 'Комиссия, GEL',
//     class: 'col-4',
//     required: false,
//     readonly: true,
//     disabled: false
//   }
// ];
