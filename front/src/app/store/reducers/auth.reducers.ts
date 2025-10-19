import { createReducer, on, Action } from '@ngrx/store';
import { initialAuthState } from '@app/store/state/auth.state';
import * as AuthActions from '@app/store/actions/auth.actions';
import { AuthState } from '@app/_models';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.Login, state => ({
    ...state,
    authorities: {
      ...state.authorities
    },
    isLoading: true
  })),
  on(AuthActions.LoginLoading, state => ({
    ...state,
    authorities: {
      ...state.authorities
    },
    isLoading: false
  })),
  on(AuthActions.FormValidation, (state, { data }) => ({
    ...state,
    authorities: {
      ...state.authorities
    },
    isInvalid: data.isInvalid
  })),
  on(AuthActions.LoginComplete, (state, { data }) => {
    return { ...data.userInfo, isLoading: false, isAuthenticated: data.isAuthenticated };
  }),
  on(AuthActions.Logout, state => {
    return { ...initialAuthState, authorities: { ...initialAuthState.authorities } };
  })
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
