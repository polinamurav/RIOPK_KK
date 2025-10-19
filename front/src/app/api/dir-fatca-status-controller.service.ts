import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import {
  Dir,
  DirFatcaStatus,
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
  transformOptions,
  TransformQueryParams,
  UploadOptions
} from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirFatcaStatusControllerService {
  private baseUrl = environment.baseUrl + '/fatca_status';

  constructor(private http: HttpClient) {}

  /**
   * Получение полного списка данных
   * @returns Observable of Dir
   */
  public getList(): Observable<DirFatcaStatus[]> {
    return this.http.get<DirFatcaStatus[]>(`${this.baseUrl}`);
  }

  /**
   * Получение полного списка данных и очистка кэша
   * @returns Observable of Dir
   */
  public getListAndClearCache(): Observable<DirFatcaStatus[]> {
    return this.http.get<DirFatcaStatus[]>(`${this.baseUrl}/cache-evict`);
  }

  /**
   * Добавление файла
   * @param data Файл и информация о нём
   * @returns Observable of Dir
   */
  public create(data: Dir): Observable<DirFatcaStatus> {
    return this.http.post<DirFatcaStatus>(`${this.baseUrl}`, data);
  }

  /**
   * получение справочника по id
   * @param id: number
   * @returns Observable of Dir
   */
  public getById(id: number): Observable<DirFatcaStatus> {
    return this.http.get<DirFatcaStatus>(`${this.baseUrl}/${id}`);
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
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirFatcaStatus>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirFatcaStatus>>(`${this.baseUrl}/page`, { params });
  }

  /**
   * Обновление
   * @param data: Dir
   * @returns Observable<Dir>
   */
  public update(data: DirFatcaStatus): Observable<DirFatcaStatus> {
    return this.http.post<DirFatcaStatus>(`${this.baseUrl}/update`, {
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
