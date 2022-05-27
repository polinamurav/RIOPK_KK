import {
  Dir,
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
export class DirInnTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка ИНН Тип
   * @returns Observable of Dir
   */
  public getList(): Observable<Dir[]> {
    return this.http.get<Dir[]>(`${this.baseUrl}/inn-type`);
  }

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Dir>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Dir>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Dir>>(`${this.baseUrl}/inn-type/page`, {
      params
    });
  }

  /**
   * Создание списка ИНН Тип
   * @returns Observable of number
   */
  create(innStatusItem: Dir): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/inn-type`, innStatusItem);
  }

  /**
   * Обновление списка ИНН Тип
   * @returns Observable of number
   */
  update(innStatusItem: Dir): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/inn-type/update`, innStatusItem);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/inn-type/download`, { responseType: 'blob' });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/inn-type/upload`, params);
  }
}
