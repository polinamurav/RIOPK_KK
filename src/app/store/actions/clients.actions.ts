import { PageDTO, PaginationAndSortingDto } from '@app/_models';
import { createAction, props } from '@ngrx/store';

import { ClientPagedInfoDto } from '@app/_models/api-models/client';

export enum ClientsActions {
  ClientsSetInProgress = '[Clients page], Clients set inProgress',
  ClientsSetInProgressSuccess = '[Clients page], Clients set inProgress success',

  ClientsSetCompleted = '[Clients page], Clients set Completed',
  ClientsSetCompletedSuccess = '[Clients page], Clients set Completed success',

  ClientsSetError = '[Clients page], Clients set Error',
  ClientsSetErrorSuccess = '[Clients page], Clients set Error success',

  ClientsSetAll = '[Clients page], Clients set All',
  ClientsSetAllSuccess = '[Clients page], Clients set All success',

  ClientsSearchSet = '[Clients], Set Search options',
  ClientsSearchReset = '[Clients], Reset Search options'
}

// inProgress
export const ClientsSetInProgressAction = createAction(
  ClientsActions.ClientsSetInProgress,
  props<{ data: PaginationAndSortingDto }>()
);
export const ClientsSetInProgressSuccessAction = createAction(
  ClientsActions.ClientsSetInProgressSuccess,
  props<{ data: PageDTO<ClientPagedInfoDto> }>()
);

// Completed
export const ClientsSetCompletedAction = createAction(
  ClientsActions.ClientsSetCompleted,
  props<{ data: PaginationAndSortingDto }>()
);
export const ClientsSetCompletedSuccessAction = createAction(
  ClientsActions.ClientsSetCompletedSuccess,
  props<{ data: PageDTO<ClientPagedInfoDto> }>()
);

// Error
export const ClientsSetErrorAction = createAction(
  ClientsActions.ClientsSetError,
  props<{ data: PaginationAndSortingDto }>()
);
export const ClientsSetErrorSuccessAction = createAction(
  ClientsActions.ClientsSetErrorSuccess,
  props<{ data: PageDTO<ClientPagedInfoDto> }>()
);

// All
export const ClientsSetAllAction = createAction(
  ClientsActions.ClientsSetAll,
  props<{ data: PaginationAndSortingDto }>()
);
export const ClientsSetAllSuccessAction = createAction(
  ClientsActions.ClientsSetAllSuccess,
  props<{ data: PageDTO<ClientPagedInfoDto> }>()
);

// Search Set
export const ClientsSetSearchAction = createAction(ClientsActions.ClientsSearchSet, props<{ value: string }>());

// Search Reset
export const ClientsResetFilterAction = createAction(ClientsActions.ClientsSearchReset);
