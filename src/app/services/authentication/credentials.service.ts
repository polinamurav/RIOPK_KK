import { AuthResponseDto, RoleAuthority, RoleDto, UserDto } from '@app/_models';

import { IAppState } from '@app/store/state/app.state';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { LoginComplete } from '@app/store/actions/auth.actions';
import { Store } from '@ngrx/store';

const authInfoKey = 'authInfo';
const userInfoKey = 'userInfo';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private _authInfo: AuthResponseDto | null = null;
  private _userInfo: boolean = false;
  private _userRoles: RoleDto[] = [];

  constructor(private localStorage: LocalStorageService, private _store: Store<IAppState>) {
    const savedAuthInfo = localStorage.get(authInfoKey);
    const savedUserInfo: UserDto = localStorage.get(userInfoKey);
    if (!!savedAuthInfo && !!savedUserInfo) {
      this._authInfo = savedAuthInfo;
      this._userInfo = true;
      this._userRoles = savedUserInfo.authorities;
      this._store.dispatch(LoginComplete({ data: { userInfo: savedUserInfo, isAuthenticated: true } }));
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    // return this._store.pipe(select(selectIsAuthenticated))
    return !!this._authInfo && !!this._userInfo;
  }

  /**
   * Gets the Auth info.
   * @return The Auth info or null if the user is not authenticated.
   */
  get authInfo(): AuthResponseDto | null {
    return this._authInfo;
  }

  get isAdmin() {
    return this._userRoles.some(role => role.authority === RoleAuthority.ADMIN);
  }

  get isCreditManager() {
    return this._userRoles.some(role => role.authority === RoleAuthority.CREDIT_MANAGER);
  }

  get isCallCenter() {
    return this._userRoles.some(role => role.authority === RoleAuthority.CALL_CENTER);
  }

  get isVerifier() {
    return this._userRoles.some(role => role.authority === RoleAuthority.VERIFIER);
  }

  get isAuditor() {
    return this._userRoles.some(role => role.authority === RoleAuthority.AUDITOR);
  }

  get isCreditManagerBoss() {
    return this._userRoles.some(role => role.authority === RoleAuthority.CREDIT_MANAGER_BOSS);
  }

  get isCallCenterBoss() {
    return this._userRoles.some(role => role.authority === RoleAuthority.CALL_CENTER_BOSS);
  }

  get isDecisionMaker() {
    return this._userRoles.some(role => role.authority === RoleAuthority.DECISION_MAKER);
  }

  get isSalesDep() {
    return this._userRoles.some(role => role.authority === RoleAuthority.SALES_DEP);
  }

  get isDSA() {
    return this._userRoles.some(role => role.authority === RoleAuthority.DSA);
  }

  get isDSABoss() {
    return this._userRoles.some(role => role.authority === RoleAuthority.DSA_BOSS);
  }

  get isVideoBank() {
    return this._userRoles.some(role => role.authority === RoleAuthority.VIDEO_BANK);
  }

  get isVideoBankBoss() {
    return this._userRoles.some(role => role.authority === RoleAuthority.VIDEO_BANK_BOSS);
  }

  get isDecisionMakerBoss() {
    return this._userRoles.some(role => role.authority === RoleAuthority.DECISION_MAKER_BOSS);
  }

  get isVerifierBoss() {
    return this._userRoles.some(role => role.authority === RoleAuthority.VERIFIER_BOSS);
  }

  get isArchivist() {
    return this._userRoles.some(role => role.authority === RoleAuthority.ARCHIVIST);
  }

  /**
   * Sets the user userInfo.
   * Otherwise, the userInfo are only persisted for the current session.
   * @param userInfo The user userInfo.
   * @param remember True to remember userInfo across sessions.
   */
  setUsetInfo(userInfo?: UserDto) {
    this._userInfo = !!userInfo;

    if (userInfo) {
      this._userRoles = userInfo.authorities;
      this.localStorage.set(userInfoKey, userInfo);
    } else {
      this._userRoles = [];
      this.localStorage.remove(userInfoKey);
      this.localStorage.remove(authInfoKey);
    }
  }

  /**
   * Sets the user authInfo.
   * Otherwise, the authInfo are only persisted for the current session.
   * @param authInfo The user authInfo.
   * @param remember True to remember authInfo across sessions.
   */
  setAuthInfo(authInfo?: AuthResponseDto) {
    this._authInfo = authInfo || null;

    if (authInfo) {
      this.localStorage.set(authInfoKey, authInfo);
    } else {
      this.localStorage.clear();
    }
  }

  checkRoles(roles: RoleAuthority[]): boolean {
    const ROlES_TO_CREDENTIALS: Record<string, boolean> = {
      [RoleAuthority.ADMIN]: this.isAdmin,
      [RoleAuthority.CREDIT_MANAGER]: this.isCreditManager,
      [RoleAuthority.CALL_CENTER]: this.isCallCenter,
      [RoleAuthority.VERIFIER]: this.isVerifier,
      [RoleAuthority.AUDITOR]: this.isAuditor,
      [RoleAuthority.CREDIT_MANAGER_BOSS]: this.isCreditManagerBoss,
      [RoleAuthority.CALL_CENTER_BOSS]: this.isCallCenterBoss,
      [RoleAuthority.DECISION_MAKER]: this.isDecisionMaker,
      [RoleAuthority.SALES_DEP]: this.isSalesDep,
      [RoleAuthority.DSA]: this.isDSA,
      [RoleAuthority.DSA_BOSS]: this.isDSABoss,
      [RoleAuthority.VIDEO_BANK]: this.isVideoBank,
      [RoleAuthority.VIDEO_BANK_BOSS]: this.isVideoBankBoss,
      [RoleAuthority.DECISION_MAKER_BOSS]: this.isDecisionMakerBoss,
      [RoleAuthority.VERIFIER_BOSS]: this.isVerifierBoss,
      [RoleAuthority.ARCHIVIST]: this.isArchivist
    };

    return roles.some((role: RoleAuthority) => ROlES_TO_CREDENTIALS[role]);
  }
}
