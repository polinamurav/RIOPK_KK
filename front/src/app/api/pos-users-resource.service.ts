import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import {PageDTO, PaginationAndSortingDto, PosRkkDataDto, TransformQueryParams, UserPosDto} from '@app/_models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PosUsersResourceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // getList() {
  //   return this.http.get<UserPosDto[]>(`${this.baseUrl}/pos/user`);
  // }

  getByPage(param: PaginationAndSortingDto) {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<UserPosDto>>(`${this.baseUrl}/pos/user`, { params });
  }

  create(data: UserPosDto) {
    return this.http.post<UserPosDto>(`${this.baseUrl}/pos/user`, data);
  }

  update(data: UserPosDto) {
    return this.http.post<UserPosDto>(`${this.baseUrl}/pos/user/update`, data);
  }

  getPosRegManager() {
    return this.http.get<UserPosDto[]>(`${this.baseUrl}/pos/user/reg-manager`);
  }

  getPosTTUser() {
    return this.http.get<UserPosDto[]>(`${this.baseUrl}/pos/user/tt`);
  }

  getPosUsersByBranchCode(branchCode: string) {
    return this.http.get<UserPosDto[]>(`${this.baseUrl}/pos/user/tt-by-branch?branchCode=${branchCode} `);
  }

  getDataForRkk(applicationId: number){
    return this.http.get<PosRkkDataDto>(`${this.baseUrl}/pos/form/rkk?applicationId=${applicationId}`);
  }

}
