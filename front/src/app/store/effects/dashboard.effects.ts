import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DashboardSetContentAction,
  DashoardSetContentSuccessAction,
  DashboardSetMyTasksAction,
  DashoardSetMyTasksSuccessAction
} from '../actions/dashboard.actions';
import { ApplicationControllerService } from '@app/api';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DashboardEffects {
  getDashboard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardSetContentAction),
      switchMap(action => {
        return this.appService.getDashboard(action.data, action.filter);
      }),
      switchMap(data => {
        return of(DashoardSetContentSuccessAction({ data }));
      })
    );
  });

  getMyTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardSetMyTasksAction),
      switchMap(action => {
        return this.appService.getMyTasks(action.data, action.filter, 'my-tasks', action.userId);
      }),
      switchMap(data => {
        return of(DashoardSetMyTasksSuccessAction({ data }));
      })
    );
  });

  constructor(private actions$: Actions, private appService: ApplicationControllerService) {}
}
