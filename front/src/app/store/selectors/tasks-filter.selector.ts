import { createSelector } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { TasksFilterState } from '@app/_models';

const selectTasksFilter = (state: IAppState) => state.tasksFilter;

export const selectQueuesFilterOptions = createSelector(
  selectTasksFilter,
  (state: TasksFilterState) => state.queuesFilterOptions
);

export const selectDashboardFilterOptions = createSelector(
  selectTasksFilter,
  (state: TasksFilterState) => state.dashboardFilterOptions
);

export const selectQueuesSearchParams = createSelector(
  selectTasksFilter,
  (state: TasksFilterState) => state.queuesSearch
);

export const selectDashboardSearchParams = createSelector(
  selectTasksFilter,
  (state: TasksFilterState) => state.dashboardSearch
);
