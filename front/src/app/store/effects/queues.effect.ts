import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  QueuesSetAllAction,
  QueuesSetAllSuccessAction,
  QueuesSetArchiveAction,
  QueuesSetArchiveSuccessAction,
  QueuesSetDeclineAction,
  QueuesSetDeclineSuccessAction,
  QueuesSetErrorAction,
  QueuesSetErrorSuccessAction,
  QueuesSetMonitoringAction,
  QueuesSetMonitoringSuccessAction,
  QueuesSetUserTasksAction,
  QueuesSetUserTasksSuccessAction
} from '../actions/queues.actions';

import { ApplicationControllerService } from '@app/api';
import { Injectable } from '@angular/core';
import { RefinanceMonitorControllerService } from '@app/api/refinance-monitor-controller.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class QueuesEffects {
  getArchive$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QueuesSetArchiveAction),
      switchMap(action => {
        return this.appService.getQueue(action.data, action.filter, 'archive');
      }),
      switchMap(data => {
        return of(QueuesSetArchiveSuccessAction({ data }));
      })
    );
  });

  getUserTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QueuesSetUserTasksAction),
      switchMap(action => {
        return this.appService.getQueue(action.data, action.filter, 'userTasks');
      }),
      switchMap(data => {
        return of(QueuesSetUserTasksSuccessAction({ data }));
      })
    );
  });

  getDeclines$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QueuesSetDeclineAction),
      switchMap(action => {
        return this.appService.getQueue(action.data, action.filter, 'decline');
      }),
      switchMap(data => {
        return of(QueuesSetDeclineSuccessAction({ data }));
      })
    );
  });

  getError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QueuesSetErrorAction),
      switchMap(action => {
        return this.appService.getQueue(action.data, action.filter, 'error');
      }),
      switchMap(data => {
        return of(QueuesSetErrorSuccessAction({ data }));
      })
    );
  });

  getAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QueuesSetAllAction),
      switchMap(action => {
        return this.appService.getQueue(action.data, action.filter, 'all');
      }),
      switchMap(data => {
        return of(QueuesSetAllSuccessAction({ data }));
      })
    );
  });

  getMonitoring$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QueuesSetMonitoringAction),
      switchMap(action => {
        return this.refinanceMonitorService.getQueue(action.data);
      }),
      switchMap(data => {
        return of(QueuesSetMonitoringSuccessAction({ data }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private appService: ApplicationControllerService,
    private refinanceMonitorService: RefinanceMonitorControllerService
  ) {}
}
