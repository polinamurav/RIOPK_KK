import { Action, createReducer, on } from '@ngrx/store';
import { TasksFilterState } from '@app/_models';
import { initialTasksFilterState } from '../state/tasks-filter.state';
import * as TasksFilterActions from '../actions/tasks-filter.actions';
import * as cloneDeep from '../../../../node_modules/clone-deep';

export const tasksFilterReducer = createReducer(
  initialTasksFilterState,
  on(TasksFilterActions.DashboardTasksSetFilterAction, (state, { filterParams }) => {
    const copyState = cloneDeep(state);
    copyState.dashboardFilterOptions = filterParams;
    return copyState;
  }),
  on(TasksFilterActions.QueuesTasksSetFilterAction, (state, { filterParams }) => {
    const copyState = cloneDeep(state);
    copyState.queuesFilterOptions = filterParams;
    return copyState;
  }),
  on(TasksFilterActions.DashboardTasksSetSearchAction, (state, { searchParams }) => {
    const copyState = cloneDeep(state);
    copyState.dashboardSearch = searchParams;
    return copyState;
  }),
  on(TasksFilterActions.QueuesTasksSetSearchAction, (state, { searchParams }) => {
    const copyState = cloneDeep(state);
    copyState.queuesSearch = searchParams;
    return copyState;
  }),

  on(TasksFilterActions.DashboardTasksResetFilterAction, state => {
    const copyState = cloneDeep(state);
    copyState.dashboardFilterOptions = { ...initialTasksFilterState.dashboardFilterOptions };
    return copyState;
  }),
  on(TasksFilterActions.QueuesTasksResetFilterAction, state => {
    const copyState = cloneDeep(state);
    copyState.queuesFilterOptions = { ...initialTasksFilterState.queuesFilterOptions };
    return copyState;
  }),
  on(TasksFilterActions.DashboardTasksResetSearchAction, state => {
    const copyState = cloneDeep(state);
    copyState.dashboardSearch = { ...initialTasksFilterState.dashboardSearch };
    return copyState;
  }),
  on(TasksFilterActions.QueuesTasksResetSearchAction, state => {
    const copyState = cloneDeep(state);
    copyState.queuesSearch = { ...initialTasksFilterState.queuesSearch };
    return copyState;
  })
);

export function reducer(state: TasksFilterState | undefined, action: Action) {
  return tasksFilterReducer(state, action);
}
