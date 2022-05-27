import {
  Directory,
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
import { ProductGroup } from '@app/constants/product-group';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class DirActivitiesControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @returns Observable of Directory
   */
  public getList(productGroupId?: ProductGroup): Observable<Directory[]> {
    if (productGroupId) {
      const params = { 'product-group': productGroupId };
      return this.http.get<Directory[]>(`${this.baseUrl}/activities`, { params });
    }
    return this.http.get<Directory[]>(`${this.baseUrl}/activities`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Directory>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Directory>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Directory>>(`${this.baseUrl}/activities/page`, { params });
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/activities/download`, { responseType: 'blob' });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/activities/upload`, params);
  }
}
