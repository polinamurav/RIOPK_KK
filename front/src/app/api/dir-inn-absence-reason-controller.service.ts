import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  PageDTO,
  ResponseEntity,
  PaginationAndSortingDto,
  TransformQueryParams,
  UploadOptions,
  transformOptions,
  Dir
} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DirInnAbsenceReasonControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение полного списка данных
   * @returns Observable of Dir
   */
  public getList(): Observable<Dir[]> {
    return this.http.get<Dir[]>(`${this.baseUrl}/inn-absecce-reason`);
  }

  /**
   * Добавление файла
   * @param data Файл и информация о нём
   * @returns Observable of <Dir>
   */
  public create(data: Dir): Observable<Dir> {
    return this.http.post<Dir>(`${this.baseUrl}/inn-absecce-reason`, data);
  }

  /**
   * получение справочника по id
   * @param id: number
   * @returns Observable of Dir
   */
  public getById(id: number): Observable<Dir> {
    return this.http.get<Dir>(`${this.baseUrl}/inn-absecce-reason/${id}`);
  }

  /**
   * деактивация справочника по id
   * @param id: number
   * @returns Observable<ResponseEntity>
   */
  public deactivate(id: number): Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.baseUrl}/inn-absecce-reason/deactivate/${id}`);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/inn-absecce-reason/download`, { responseType: 'blob' });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Dir>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Dir>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Dir>>(`${this.baseUrl}/inn-absecce-reason/page`, { params });
  }

  /**
   * Обновление
   * @param data: Dir
   * @returns Observable<Dir>
   */
  public update(data: Dir): Observable<Dir> {
    return this.http.post<Dir>(`${this.baseUrl}/inn-absecce-reason/update`, {
      ...data
    });
  }

  /**
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/inn-absecce-reason/upload`, params);
  }
}
