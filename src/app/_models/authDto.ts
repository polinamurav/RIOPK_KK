export class AuthRequestDto {
  username: string;
  password: string;
  fingerPrint: string;
}

export class AuthRefreshDto {
  refreshTokenId: number;
  fingerPrint: string;
}

export class AuthResponseDto {
  access_token: string;
  refresh_token: string;
}

export class GrantedAuthority {
  authority: string;
}

export class JwtUser {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  active: boolean;
  authorities: GrantedAuthority;
  credentialsNonExpired: boolean;
  email: string;
  enabled: boolean;
  firstName: string;
  id: number;
  lastName: string;
  middleName: string;
  passwordResetDate: string;
  username: string;
}
