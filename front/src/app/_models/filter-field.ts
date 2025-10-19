import { IFilterSubField } from './filter-sub-field';

export interface IFilterField {
  label: string;
  fcName: string;
  val: string | Date | boolean | IFilterSubField[];
  type: string;
  options?: any;
  propertyName?: string;
}
