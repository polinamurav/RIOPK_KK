import { createAction, props } from '@ngrx/store';
import { UserDto } from '@app/_models';

export enum AuthActions {
  Login = '[Login Page] Login',
  LoginLoading = '[Login Page] Login Loading',
  FormValidation = '[Login Page] Form Validation',
  LoginComplete = '[Login Page] Login Complete',
  Logout = '[Login Page] Logout',
  UpdateCurrentUser = '[Header] Update Current User'
}

export const Login = createAction(
  AuthActions.Login,
  props<{ data: { loginForm: { username: string; password: string }; fingerPrint: string } }>()
);

export const LoginLoading = createAction(AuthActions.LoginLoading, props<{ data: { isLoading: boolean } }>());

export const FormValidation = createAction(AuthActions.FormValidation, props<{ data: { isInvalid: boolean } }>());

export const LoginComplete = createAction(
  AuthActions.LoginComplete,
  props<{ data: { userInfo: UserDto; isAuthenticated: boolean } }>()
);

export const UpdateCurrentUser = createAction(AuthActions.UpdateCurrentUser, props<{ data: UserDto }>());

export const Logout = createAction(AuthActions.Logout, props<{}>());
