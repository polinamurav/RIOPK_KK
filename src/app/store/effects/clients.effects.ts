import * as ClientsActions from '@app/store/actions/clients.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ClientControllerService } from '@app/api';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ClientsEffects {
  getInProgress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClientsActions.ClientsSetInProgressAction),
      switchMap(action => {
        return this.clientService.getClients(action.data, 'userTasks');
      }),
      switchMap(data => {
        return of(ClientsActions.ClientsSetInProgressSuccessAction({ data }));
      })
    );
  });

  getCompleted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClientsActions.ClientsSetCompletedAction),
      switchMap(action => {
        return this.clientService.getClients(action.data, 'archive');
      }),
      switchMap(data => {
        return of(ClientsActions.ClientsSetCompletedSuccessAction({ data }));
      })
    );
  });

  getError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClientsActions.ClientsSetErrorAction),
      switchMap(action => {
        return this.clientService.getClients(action.data, 'error');
      }),
      switchMap(data => {
        return of(ClientsActions.ClientsSetErrorSuccessAction({ data }));
      })
    );
  });

  getAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClientsActions.ClientsSetAllAction),
      switchMap(action => {
        return this.clientService.getClients(action.data, 'all');
      }),
      switchMap(data => {
        return of(ClientsActions.ClientsSetAllSuccessAction({ data }));
      })
    );
  });

  search$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClientsActions.ClientsSetSearchAction),
      switchMap(action => {
        return this.clientService.getByPage(action.value);
      }),
      switchMap(data => {
        return of(ClientsActions.ClientsSetAllSuccessAction({ data }));
      })
    );
  });

  // resetSearch$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ClientsActions.ClientsResetFilterAction),
  //     switchMap(action => {
  //       return this.clientService.getClients(action.data, 'all');
  //     }),
  //     switchMap(data => {
  //       return of(ClientsActions.ClientsSetAllSuccessAction({ data }));
  //     })
  //   );
  // });

  constructor(private actions$: Actions, private clientService: ClientControllerService) {}
}
