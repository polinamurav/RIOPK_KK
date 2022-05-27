import {
  DirBusinessInspectionResult,
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
export class DirBusinessInspectionResultControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка BusinessInspectionResult
   * @returns Observable of DirBusinessInspectionResult
   */
  public getList(): Observable<DirBusinessInspectionResult[]> {
    return this.http.get<DirBusinessInspectionResult[]>(`${this.baseUrl}/business-inspection-result`);
  }

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirBusinessInspectionResult>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirBusinessInspectionResult>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirBusinessInspectionResult>>(`${this.baseUrl}/business-inspection-result/page`, {
      params
    });
  }

  /**
   * Создание списка BusinessInspectionResult
   * @returns Observable of number
   */
  create(dirBusinessInspectionResult: DirBusinessInspectionResult): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/business-inspection-result`, dirBusinessInspectionResult);
  }

  /**
   * Обновление списка BusinessInspectionResult
   * @returns Observable of number
   */
  update(dirBusinessInspectionResult: DirBusinessInspectionResult): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/business-inspection-result/update`, dirBusinessInspectionResult);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/business-inspection-result/download`, { responseType: 'blob' });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/business-inspection-result/upload`, params);
  }
}
