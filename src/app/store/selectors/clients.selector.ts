import { ClientsFilter, ClientsState } from '@app/_models/api-models/client';

import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';

const selectClients = (state: IAppState) => state.clients;
const selectClientsFilter = (state: IAppState) => state.clientsFilter;

export const selectInProgress = createSelector(
  selectClients,
  (state: ClientsState) => state.inProgress
);

export const selectCompleted = createSelector(
  selectClients,
  (state: ClientsState) => state.completed
);

export const selectError = createSelector(
  selectClients,
  (state: ClientsState) => state.error
);

export const selectAll = createSelector(
  selectClients,
  (state: ClientsState) => state.all
);

export const selectClientSearchParams = createSelector(
  selectClientsFilter,
  (state: ClientsFilter) => state.clientsSearch
);
