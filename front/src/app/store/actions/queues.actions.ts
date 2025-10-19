import { ApplicationPagedInfoDto, IFilteredParams, PageDTO, PaginationAndSortingDto } from '@app/_models';
import { createAction, props } from '@ngrx/store';

export enum QueuesActions {
  QueuesSetArchive = '[Queues page], Queues set Archive',
  QueuesSetArchiveSuccess = '[Queues page], Queues set Archive success',

  QueuesSetUserTasks = '[Queues page], Queues set UserTasks',
  QueuesSetUserTasksSuccess = '[Queues page], Queues set UserTasks success',

  QueuesSetDecline = '[Queues page], Queues set Decline',
  QueuesSetDeclineSuccess = '[Queues page], Queues set Decline success',

  QueuesSetError = '[Queues page], Queues set Error',
  QueuesSetErrorSuccess = '[Queues page], Queues set Error success',

  QueuesSetAll = '[Queues page], Queues set All',
  QueuesSetAllSuccess = '[Queues page], Queues set All success',

  QueuesSetMonitoring = '[Queues page], Queues set Monitoring',
  QueuesSetMonitoringSuccess = '[Queues page], Queues set Monitoring success'
}

// Archive
export const QueuesSetArchiveAction = createAction(
  QueuesActions.QueuesSetArchive,
  props<{ data: PaginationAndSortingDto; filter: IFilteredParams }>()
);
export const QueuesSetArchiveSuccessAction = createAction(
  QueuesActions.QueuesSetArchiveSuccess,
  props<{ data: PageDTO<ApplicationPagedInfoDto> }>()
);

// UserTasks
export const QueuesSetUserTasksAction = createAction(
  QueuesActions.QueuesSetUserTasks,
  props<{ data: PaginationAndSortingDto; filter: IFilteredParams }>()
);
export const QueuesSetUserTasksSuccessAction = createAction(
  QueuesActions.QueuesSetUserTasksSuccess,
  props<{ data: PageDTO<ApplicationPagedInfoDto> }>()
);

// Decline
export const QueuesSetDeclineAction = createAction(
  QueuesActions.QueuesSetDecline,
  props<{ data: PaginationAndSortingDto; filter: IFilteredParams }>()
);
export const QueuesSetDeclineSuccessAction = createAction(
  QueuesActions.QueuesSetDeclineSuccess,
  props<{ data: PageDTO<ApplicationPagedInfoDto> }>()
);

// Error
export const QueuesSetErrorAction = createAction(
  QueuesActions.QueuesSetError,
  props<{ data: PaginationAndSortingDto; filter: IFilteredParams }>()
);
export const QueuesSetErrorSuccessAction = createAction(
  QueuesActions.QueuesSetErrorSuccess,
  props<{ data: PageDTO<ApplicationPagedInfoDto> }>()
);

// All
export const QueuesSetAllAction = createAction(
  QueuesActions.QueuesSetAll,
  props<{ data: PaginationAndSortingDto; filter: IFilteredParams }>()
);
export const QueuesSetAllSuccessAction = createAction(
  QueuesActions.QueuesSetAllSuccess,
  props<{ data: PageDTO<ApplicationPagedInfoDto> }>()
);

// Monitoring
export const QueuesSetMonitoringAction = createAction(
  QueuesActions.QueuesSetMonitoring,
  props<{ data: PaginationAndSortingDto; filter: IFilteredParams }>()
);
export const QueuesSetMonitoringSuccessAction = createAction(
  QueuesActions.QueuesSetMonitoringSuccess,
  props<{ data: PageDTO<ApplicationPagedInfoDto> }>()
);
