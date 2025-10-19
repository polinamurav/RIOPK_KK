import { createReducer, on, Action } from '@ngrx/store';
import * as DashboardActions from '@app/store/actions/dashboard.actions';
import { initialDashboardState } from '@app/store/state/dashboard.state';
import { ApplicationState } from '@app/_models';
import * as cloneDeep from '../../../../node_modules/clone-deep';

export const dashboardReducer = createReducer(
  initialDashboardState,
  on(DashboardActions.DashoardSetContentSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.dashboard = data;
    return copyState;
  }),
  on(DashboardActions.DashoardSetMyTasksSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.myTasks = data;
    return copyState;
  })
);

export function reducer(state: ApplicationState | undefined, action: Action) {
  return dashboardReducer(state, action);
}
