import {
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
  Segment,
  TransformQueryParams,
  UploadOptions,
  transformOptions
} from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SegmentControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение Списка сегментов
   * @returns Observable<Segment[]>
   */
  public getList(): Observable<Segment[]> {
    return this.http.get<Segment[]>(this.baseUrl + `/segment`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Segment>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Segment>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Segment>>(`${this.baseUrl}/segment/page`, { params });
  }

  /**
   * Скачать справочник
   * @returns Observable<Segment[]>
   */
  public download(): Observable<Blob> {
    return this.http.get(this.baseUrl + `/segment/download`, { responseType: 'blob' });
  }

  /**
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/segment/upload`, params);
  }
}
