import {
  AbsCommissionConfig,
  AbsCommissionConfigDto,
  PageDTO,
  PaginationAndSortingDto,
  TransformQueryParams
} from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsCommissionConfigControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение комиссий
   * @returns Observable<AbsCommissionConfig[]>
   */
  public getList(): Observable<AbsCommissionConfig[]> {
    return this.http.get<AbsCommissionConfig[]>(this.baseUrl + `/abs-commission-config`);
  }

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<AbsCommissionConfig>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<AbsCommissionConfig>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<AbsCommissionConfig>>(`${this.baseUrl}/abs-commission-config/page`, { params });
  }

  /**
   * Создание комиссии
   * @returns Observable of number
   */
  create(commissionConfig: AbsCommissionConfigDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/abs-commission-config`, commissionConfig);
  }

  /**
   * Обновление комиссии
   * @returns Observable of number
   */
  update(commissionConfig: AbsCommissionConfigDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/abs-commission-config/update`, commissionConfig);
  }
}
