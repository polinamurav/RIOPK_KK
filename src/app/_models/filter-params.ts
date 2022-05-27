export interface IFilteredParams {
  // TODO check fields:
  decisionId?: string | number | null;
  statusId?: string | null;

  createdDate?: string | Date;
  productId?: number | string;
  stageId?: string;
  status?: string;

  creditManagerId?: number | string;
  videoBankId?: number | string;
  callCenterId?: number | string;
  verifierId?: number | string;
  decisionMakerId?: number | string;
  dsaId?: number | string;
  accepterId?: number | string;
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
