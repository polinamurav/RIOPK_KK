export interface IFilteredParams {
  // TODO check fields:
  decisionId?: string | number | null;

  productId?: number | string;
  stageId?: string;
  statusId?: string;
  createdDate?: string | Date;

  creditManagerId?: number | string;
  verifierId?: number | string;
  rmId?: number | string;
  dsaId?: number | string;
  accepterId?: number | string;
  dateFrom?: string | Date;
  dateTo?: string | Date;
  branchCode?: string;

  isDecline?: boolean;
  isError?: boolean;
  isIssued?: boolean;
  isUserTask?: boolean;
  isOnlyMyTasks?: boolean;

  type?: string;
}

export interface SearchParams {
  search: string;
}

export class TasksFilterState {
  queuesFilterOptions: IFilteredParams;
  dashboardFilterOptions: IFilteredParams;
  queuesSearch: SearchParams;
  dashboardSearch: SearchParams;
}
