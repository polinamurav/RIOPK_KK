import { Injectable } from '@angular/core';

import { CredentialsService } from './credentials.service';
import { AuthResponseDto, UserDto } from '@app/_models';

export interface LoginContext {
  username: string;
  password: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param userInfo The user Info.
   */
  login(userInfo: UserDto): void {
    this.credentialsService.setUsetInfo(userInfo);
  }

  /**
   * Init Auth infj.
   * @param context The auth Info.
   */
  initAuthInfo(authInfo: AuthResponseDto): void {
    this.credentialsService.setAuthInfo(authInfo);
  }

  /**
   * Logs out the user and clear credentials.
   */
  logout(): void {
    this.credentialsService.setAuthInfo();
  }
}
