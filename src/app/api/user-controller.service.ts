import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import {
  PageDTO,
  PaginationAndSortingDto,
  TransformQueryParams,
  UserDto,
  RoleDto,
  AuthState,
  User
} from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение пагинированного списка пользователей
   * @param param: PaginationAndSortingDto
   * @returns Observable<PageDTO<UserDto>>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<any> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<UserDto>>(this.path + `/users/page`, { params });
  }

  /**
   * Создание пользователя
   * @param data: UserDto
   * @returns Observable<UserDto>
   */
  public createOrUpdate(data: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.path + `/users`, { ...data });
  }

  /**
   * Получение ролей пользователей
   * @returns Observable<RoleDto>
   */
  public getUserRoles(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(this.path + `/users/roles`);
  }

  /**
   * Получение списка боссов
   * @returns Observable<UserDto[]>
   */
  public getUsersBoss(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.path + `/users/users-boss`);
  }

  /**
   * Получение пользователя по id
   * @param id: string | number
   * @returns Observable<UserDto>
   */
  public getUserById(id: string | number): Observable<User> {
    return this.http.get<User>(this.path + `/users/${id}`);
  }

  /**
   * Получение пользователей по роли
   * @param roleAuthority: string
   * @returns Observable<UserDto>
   */
  public getUsersByRole(roleAuthority: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.path + `/users/by-role/${roleAuthority}`);
  }

  /**
   * деактивация/активация пользователя по id
   * @returns Observable<number> - userId
   */
  public activateDeactivate(id: number): Observable<any> {
    return this.http.post<number>(this.path + `/users/deactivate/${id}`, {});
  }

  /**
   * Получение подчиненных пользователей
   * @returns Observable<AuthState[]>
   */
  public getMyDependent(): Observable<AuthState[]> {
    return this.http.get<AuthState[]>(this.path + `/users/myDependent`);
  }
}
