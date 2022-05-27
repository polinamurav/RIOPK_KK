import { IFilteredParams, PaginationAndSortingDto } from '..';

export class TransformQueryParams {
  [key: string]: string | null;

  constructor(params: PaginationAndSortingDto | IFilteredParams | { [key: string]: string | number }) {
    // Без условия дает ошибку
    if (params) {
      Object.keys(params).forEach(key => {
        this[key] = params[key] ? params[key].toString() : params[key];
      });
    }
  }
}
