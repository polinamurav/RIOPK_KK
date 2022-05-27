export class PaginationAndSortingDto {
  page?: string | number;
  size?: string | number;
  // для запроса по сортировке необходимо указать следующие два параметра:
  sort?: string;
  // для поиска:
  // fin?: string | null;
  param?: string | null;
  reportType?: string;
  isOnlyMyTasks?: boolean;
  search?: string;
  value?: string;
  lang?: string;
}
