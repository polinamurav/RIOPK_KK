import { IFilteredParams, PaginationAndSortingDto, PreapprovedOfferParams } from '..';
import { AcraLoanFilterDto } from '../api-models/integration-acra';

export class TransformQueryParams {
  [key: string]: string | null;

  constructor(
    params:
      | PaginationAndSortingDto
      | IFilteredParams
      | PreapprovedOfferParams
      | AcraLoanFilterDto
      | { [key: string]: string | number }
  ) {
    // Без условия дает ошибку
    if (params) {
      Object.keys(params).forEach(key => {
        this[key] = params[key] ? params[key].toString() : params[key];
      });
    }
  }
}
