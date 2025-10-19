import { ApplicationPagedInfoDto, PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class RefinanceMonitorControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}
  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для пагинации
   * @returns Observable of PageDTO<ApplicationPagedInfoDto>>
   */
  public getQueue(param: PaginationAndSortingDto): Observable<PageDTO<ApplicationPagedInfoDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);

    return this.http.get<PageDTO<ApplicationPagedInfoDto>>(`${this.baseUrl}/refinance-monitor/page`, { params });
  }
}
