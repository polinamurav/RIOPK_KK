import { createSelector } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { AuthState } from '@app/_models';

const selectAuth = (state: IAppState) => state.auth;

export const selectIsLoading = createSelector(
  selectAuth,
  (state: AuthState) => state.isLoading
);

export const selectIsAuthenticated = createSelector(
  selectAuth,
  (state: AuthState) => state.isAuthenticated
);

export const selectUserName = createSelector(
  selectAuth,
  (state: AuthState) => state.username
);

export const selectUserData = createSelector(
  selectAuth,
  (state: AuthState) => state
);

export const formIsValid = createSelector(
  selectAuth,
  (state: AuthState) => state.isInvalid
);
