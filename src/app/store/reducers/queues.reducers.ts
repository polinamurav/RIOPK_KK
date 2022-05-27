import * as QueuesActions from '@app/store/actions/queues.actions';
import * as cloneDeep from '../../../../node_modules/clone-deep';

import { Action, createReducer, on } from '@ngrx/store';

import { QueuesState } from '@app/_models';
import { initialQueuesState } from '@app/store/state/queues.state';

export const queuesReducer = createReducer(
  initialQueuesState,
  on(QueuesActions.QueuesSetArchiveSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.archive = data;
    return copyState;
  }),
  on(QueuesActions.QueuesSetUserTasksSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.userTasks = data;
    return copyState;
  }),
  on(QueuesActions.QueuesSetDeclineSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.decline = data;
    return copyState;
  }),
  on(QueuesActions.QueuesSetErrorSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.error = data;
    return copyState;
  }),
  on(QueuesActions.QueuesSetAllSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.all = data;
    return copyState;
  }),
  on(QueuesActions.QueuesSetMonitoringSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.monitoring = data;
    return copyState;
  })
);

export function reducer(state: QueuesState | undefined, action: Action) {
  return queuesReducer(state, action);
}
