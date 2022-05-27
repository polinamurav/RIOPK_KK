import * as ClientsActions from '@app/store/actions/clients.actions';

import { Action, createReducer, on } from '@ngrx/store';

import { ClientsFilter } from '@app/_models/api-models/client';
import { initialClientsFilterState } from '../state/clients-filter.state';

export const clientsFilterReducer = createReducer(
  initialClientsFilterState,

  on(ClientsActions.ClientsResetFilterAction, state => {
    return initialClientsFilterState;
  })
);

export function reducer(state: ClientsFilter | undefined, action: Action) {
  return clientsFilterReducer(state, action);
}
