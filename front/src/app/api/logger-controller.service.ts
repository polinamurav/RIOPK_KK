import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';
import { Observable } from 'rxjs';
import { ILogger } from '@app/_models/administration-models';

@Injectable({ providedIn: 'root' })
export class LoggerControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageAndSortResponse
   */
  public getAll(param: PaginationAndSortingDto): Observable<any> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ILogger>>(`${this.baseUrl}/logger/page`, { params });
  }
}
