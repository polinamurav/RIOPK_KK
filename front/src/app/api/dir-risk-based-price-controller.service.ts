import {
  DirRiskBasedPrice,
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
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
export class DirRiskBasedPriceControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка RBP
   * @returns Observable<DirRiskBasedPrice[]>
   */
  public getList(): Observable<DirRiskBasedPrice[]> {
    return this.http.get<DirRiskBasedPrice[]>(this.baseUrl + `/risk-based-price`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirRiskBasedPrice>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirRiskBasedPrice>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirRiskBasedPrice>>(`${this.baseUrl}/risk-based-price/page`, { params });
  }

  /**
   * Скачать справочник
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(this.baseUrl + `/risk-based-price/download`, { responseType: 'blob' });
  }

  /**
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/risk-based-price/upload`, params);
  }
}
