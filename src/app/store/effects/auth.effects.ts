import * as AuthActions from '@app/store/actions/auth.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

import { AuthenticationRestController } from '@app/api/authentication-rest-controller.service';
import { AuthenticationService } from '@app/services/authentication';
import { HttpErrorResponse } from '@angular/common/http';
import { IAppState } from '@app/store/state/app.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserControllerService } from '@app/api/user-controller.service';
import { UserDto } from '@app/_models';

@Injectable()
export class AuthEffects {
  getHash$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<any>(AuthActions.Login),
      switchMap(({ data: { loginForm, fingerPrint } }) => {
        return this.authenticationRestController.createAuthenticationToken({ ...loginForm, fingerPrint }).pipe(
          catchError(err => {
            this.store.dispatch(AuthActions.LoginLoading({ data: { isLoading: false } }));
            if ((err as HttpErrorResponse).status === 400) {
              this.store.dispatch(AuthActions.FormValidation({ data: { isInvalid: true } }));
            }
            return throwError(err);
          })
        );
      }),
      switchMap(authInfo => {
        this.authenticationService.initAuthInfo(authInfo);
        return this.authenticationRestController.getAuthenticatedUser().pipe(
          catchError(err => {
            this.store.dispatch(AuthActions.LoginLoading({ data: { isLoading: false } }));
            if ((err as HttpErrorResponse).status === 404) {
              this.store.dispatch(AuthActions.FormValidation({ data: { isInvalid: true } }));
            }
            return throwError(err);
          }),
          map(userInfo => {
            return {
              userInfo,
              authInfo
            };
          })
        );
      }),
      switchMap(({ userInfo, authInfo }) => {
        if (!(userInfo && authInfo)) {
          return throwError('');
        }
        this.authenticationService.login(userInfo);

        // mode
        this.router.navigate([this.route.snapshot.queryParams.redirect || 'mode'], { replaceUrl: true });
        // this.router.navigate([this.route.snapshot.queryParams.redirect || 'pages'], { replaceUrl: true });
        return of(AuthActions.LoginComplete({ data: { userInfo, isAuthenticated: true } }));
      })
    );
  });

  updateCurrentUser$ = createEffect(() => {
    let userInfo: UserDto;
    return this.actions$.pipe(
      ofType(AuthActions.UpdateCurrentUser),
      switchMap(({ data }) => {
        userInfo = data;
        return this.userControllerService.createOrUpdate(data);
      }),
      switchMap(_ => {
        this.authenticationService.login(userInfo);
        return of(AuthActions.LoginComplete({ data: { userInfo, isAuthenticated: true } }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute,
    private userControllerService: UserControllerService,
    private authenticationService: AuthenticationService,
    private authenticationRestController: AuthenticationRestController,
    private store: Store<IAppState>
  ) {}
}
