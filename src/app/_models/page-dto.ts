import { Sort } from './api-models/sort';
import { Pageable } from './api-models/pageable';

export class PageDTO<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  empty: boolean;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}
