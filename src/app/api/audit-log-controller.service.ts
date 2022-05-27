import { AuditLog, PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditLogControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<AuditLog>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<AuditLog>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<AuditLog>>(`${this.baseUrl}/audit-log/page`, { params });
  }
}
