import { AuthState } from '@app/_models';

export const initialAuthState: AuthState = {
  id: null,
  active: null,
  authorities: [],
  bossUsername: null,
  email: null,
  firstName: null,
  lastName: null,
  username: null,
  isLoading: null,
  isInvalid: false,
  isAuthenticated: null,
  code: null,
  dirBranch: null,
  created: null,
  changedByUsername: null,
  deactivated: null,
  deactivatedByUsername: null,
  dirDepartment: null,
  dirPartner: null,
  fio: null,
  updated: null,
  usernameAbs: null,
  patronymic: null
};
