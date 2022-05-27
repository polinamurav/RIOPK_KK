import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
  transformOptions,
  TransformQueryParams,
  UploadOptions,
  DirAbsCode
} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DirRegionControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @returns Observable of DirAbsCode
   */
  public getList(): Observable<DirAbsCode[]> {
    return this.http.get<DirAbsCode[]>(`${this.baseUrl}/region`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirAbsCode>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirAbsCode>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirAbsCode>>(`${this.baseUrl}/region/page`, { params });
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/region/download`, { responseType: 'blob' });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/region/upload`, params);
  }
}
