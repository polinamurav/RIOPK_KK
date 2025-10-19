import { createSelector } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { ApplicationState } from '@app/_models';

const selectApplication = (state: IAppState) => state.dashboard;

export const selectDashboard = createSelector(
  selectApplication,
  (state: ApplicationState) => state.dashboard
);

export const selectMyTasks = createSelector(
  selectApplication,
  (state: ApplicationState) => state.myTasks
);
