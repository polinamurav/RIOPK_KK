import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
  Directory,
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
  transformOptions,
  TransformQueryParams,
  UploadOptions
} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirOperationFreqTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @returns Observable of Directory
   */
  public getList(): Observable<Directory[]> {
    return this.http.get<Directory[]>(`${this.baseUrl}/operation-freq-type`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Directory>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Directory>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Directory>>(`${this.baseUrl}/operation-freq-type/page`, { params });
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/operation-freq-type/download`, { responseType: 'blob' });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/operation-freq-type/upload`, params);
  }
}
