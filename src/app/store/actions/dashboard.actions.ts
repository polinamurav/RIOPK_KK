import { createAction, props } from '@ngrx/store';
import { PaginationAndSortingDto, ApplicationPagedInfoDto, PageDTO, IFilteredParams } from '@app/_models';

export enum DashboardActions {
  DashoardSetContent = '[Dashboard page], Dashboard set content',
  DashoardSetContentSuccess = '[Dashboard page], Dashboard set content success',

  DashoardSetMyTasks = '[Dashboard page], Dashboard set my tasks',
  DashoardSetMyTasksSuccess = '[Dashboard page], Dashboard set my tasks success'
}

export const DashboardSetContentAction = createAction(
  DashboardActions.DashoardSetContent,
  props<{ data: PaginationAndSortingDto; filter: IFilteredParams }>()
);

export const DashoardSetContentSuccessAction = createAction(
  DashboardActions.DashoardSetContentSuccess,
  props<{ data: PageDTO<ApplicationPagedInfoDto> }>()
);

export const DashboardSetMyTasksAction = createAction(
  DashboardActions.DashoardSetMyTasks,
  props<{ data: PaginationAndSortingDto; filter: IFilteredParams; userId: string }>()
);

export const DashoardSetMyTasksSuccessAction = createAction(
  DashboardActions.DashoardSetMyTasksSuccess,
  props<{ data: PageDTO<ApplicationPagedInfoDto> }>()
);
