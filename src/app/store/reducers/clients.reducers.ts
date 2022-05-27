import * as ClientsActions from '@app/store/actions/clients.actions';
import * as cloneDeep from 'clone-deep';

import { Action, createReducer, on } from '@ngrx/store';

import { ClientsState } from '@app/_models/api-models/client';
import { initialClientsFilterState } from '../state/clients-filter.state';
import { initialClientsState } from '@app/store/state/clients.state';

export const clientsReducer = createReducer(
  initialClientsState,
  on(ClientsActions.ClientsSetInProgressSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.inProgress = data;
    return copyState;
  }),
  on(ClientsActions.ClientsSetCompletedSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.completed = data;
    return copyState;
  }),
  on(ClientsActions.ClientsSetErrorSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.error = data;
    return copyState;
  }),
  on(ClientsActions.ClientsSetAllSuccessAction, (state, { data }) => {
    const copyState = cloneDeep(state);
    copyState.all = data;
    return copyState;
  })
);

export function reducer(state: ClientsState | undefined, action: Action) {
  return clientsReducer(state, action);
}
