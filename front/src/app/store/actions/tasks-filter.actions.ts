import { IFilteredParams, SearchParams } from '@app/_models';
import { createAction, props } from '@ngrx/store';

export enum TasksFilterActions {
  DashboardTasksFilterSet = '[Dashboard], Set Filter options',
  DashboardTasksFilterReset = '[Dashboard], Reset Filter options',
  DashboardTasksSearchSet = '[Dashboard], Set Search options',
  DashboardTasksSearchReset = '[Dashboard], Reset Search options',

  QueuesTasksFilterSet = '[Queues], Set Filter options',
  QueuesTasksFilterReset = '[Queues], Reset Filter options',
  QueuesTasksSearchSet = '[Queues], Set Search options',
  QueuesTasksSearchReset = '[Queues], Reset Search options'
}

// Set
export const DashboardTasksSetFilterAction = createAction(
  TasksFilterActions.DashboardTasksFilterSet,
  props<{ filterParams: IFilteredParams }>()
);

export const QueuesTasksSetFilterAction = createAction(
  TasksFilterActions.QueuesTasksFilterSet,
  props<{ filterParams: IFilteredParams }>()
);

export const DashboardTasksSetSearchAction = createAction(
  TasksFilterActions.DashboardTasksSearchSet,
  props<{ searchParams: SearchParams }>()
);

export const QueuesTasksSetSearchAction = createAction(
  TasksFilterActions.QueuesTasksSearchSet,
  props<{ searchParams: SearchParams }>()
);

// Reset
export const DashboardTasksResetFilterAction = createAction(TasksFilterActions.DashboardTasksFilterReset);

export const QueuesTasksResetFilterAction = createAction(TasksFilterActions.QueuesTasksFilterReset);

export const DashboardTasksResetSearchAction = createAction(TasksFilterActions.DashboardTasksSearchReset);

export const QueuesTasksResetSearchAction = createAction(TasksFilterActions.QueuesTasksSearchReset);
