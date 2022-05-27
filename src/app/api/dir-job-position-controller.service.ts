import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Dir,
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
  transformOptions,
  TransformQueryParams,
  UploadOptions
} from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class DirJobPositionControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение полного списка данных
   * @returns Observable of Dir
   */
  public getList(): Observable<Dir[]> {
    return this.http.get<Dir[]>(`${this.baseUrl}/dir-job-position`);
  }

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Dir>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Dir>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Dir>>(`${this.baseUrl}/dir-job-position/page`, {
      params
    });
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/dir-job-position/download`, { responseType: 'blob' });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/dir-job-position/upload`, params);
  }
}
