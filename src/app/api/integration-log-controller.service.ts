import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { TransformQueryParams, PageDTO, PaginationAndSortingDto, IntegrationLog } from '@app/_models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IntegrationLogControllerService {
  private integrPath = environment.integrationUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<IntegrationLog>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<IntegrationLog>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<IntegrationLog>>(this.integrPath + `/integration-log/page`, { params });
  }
}
