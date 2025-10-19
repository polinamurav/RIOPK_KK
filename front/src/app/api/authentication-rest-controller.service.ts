import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { AuthRequestDto, AuthResponseDto, UserDto, ResponseEntity } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationRestController {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Регистрация пользователя в системе
   * @param authRequestDto Параметры для POST запроса регистрации пользователя
   * @returns Observable
   */
  public createAuthenticationToken(authRequestDto: AuthRequestDto): Observable<AuthResponseDto> {
    const transformedPassword = encodeURIComponent(authRequestDto.password);
    return this.http.post<AuthResponseDto>(
      `${this.path}/oauth/token`,
      `grant_type=password&username=${authRequestDto.username}&password=${transformedPassword}`,
      { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    );
  }

  /**
   * Информация о прользователе при авторизации
   * @returns Observable<UserDto>
   */
  public getAuthenticatedUser(): Observable<UserDto> {
    return this.http.get<UserDto>(this.path + `/users/current`);
  }

  /**
   * Обновление токена
   * @param authRefreshDto Токен на обновление и хэш пользователя
   */
  public refreshToken(refresh_token: string): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(
      `${this.path}/oauth/token?grant_type=refresh_token&refresh_token=${refresh_token}`,
      null
    );
  }

  /**
   * Обнуление токена и сессии
   */
  public revokeToken(): Observable<ResponseEntity> {
    console.log('revokeToken');
    return this.http.post<ResponseEntity>(`${this.path}/token/revoke`, null);
  }
}
