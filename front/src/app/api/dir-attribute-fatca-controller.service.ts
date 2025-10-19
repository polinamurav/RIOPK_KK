import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DirAttributeFatca,
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
export class DirAttributeFatcaControllerService {
  private baseUrl = environment.baseUrl + '/attribute_fatca';

  constructor(private http: HttpClient) {}

  /**
   * Получение полного списка данных
   * @returns Observable of Dir
   */
  public getList(): Observable<DirAttributeFatca[]> {
    return this.http.get<DirAttributeFatca[]>(`${this.baseUrl}`);
  }

  /**
   * Получение полного списка данных и очистка кэша
   * @returns Observable of Dir
   */
  public getListAndClearCache(): Observable<DirAttributeFatca[]> {
    return this.http.get<DirAttributeFatca[]>(`${this.baseUrl}/cache-evict`);
  }

  /**
   * Добавление файла
   * @param data Файл и информация о нём
   * @returns Observable of Dir
   */
  public create(data: DirAttributeFatca): Observable<DirAttributeFatca> {
    return this.http.post<DirAttributeFatca>(`${this.baseUrl}`, data);
  }

  /**
   * получение справочника по id
   * @param id: number
   * @returns Observable of Dir
   */
  public getById(id: number): Observable<DirAttributeFatca> {
    return this.http.get<DirAttributeFatca>(`${this.baseUrl}/${id}`);
  }

  /**
   * деактивация справочника по id
   * @param id: number
   * @returns Observable<ResponseEntity>
   */
  public deactivate(id: number): Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.baseUrl}/deactivate/${id}`);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download`, { responseType: 'blob' });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Dir>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirAttributeFatca>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirAttributeFatca>>(`${this.baseUrl}/page`, { params });
  }

  /**
   * Обновление
   * @param data: Dir
   * @returns Observable<Dir>
   */
  public update(data: DirAttributeFatca): Observable<DirAttributeFatca> {
    return this.http.post<DirAttributeFatca>(`${this.baseUrl}/update`, {
      ...data
    });
  }

  /**
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/upload`, params);
  }
}
