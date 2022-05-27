import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  PageDTO,
  Dir,
  ResponseEntity,
  PaginationAndSortingDto,
  TransformQueryParams,
  UploadOptions,
  transformOptions
} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DirCommunicationTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение полного списка данных
   * @returns Observable of Dir
   */
  public getList(): Observable<Dir[]> {
    return this.http.get<Dir[]>(`${this.baseUrl}/communication-type`);
  }

  /**
   * Добавление файла
   * @param data Файл и информация о нём
   * @returns Observable of <Dir>
   */
  public create(data: Dir): Observable<Dir> {
    return this.http.post<Dir>(`${this.baseUrl}/communication-type`, data);
  }

  /**
   * получение справочника по id
   * @param id: number
   * @returns Observable of Dir
   */
  public getById(id: number): Observable<Dir> {
    return this.http.get<Dir>(`${this.baseUrl}/communication-type/${id}`);
  }

  /**
   * деактивация справочника по id
   * @param id: number
   * @returns Observable<ResponseEntity>
   */
  public deactivate(id: number): Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.baseUrl}/communication-type/deactivate/${id}`);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/communication-type/download`, { responseType: 'blob' });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Dir>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Dir>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Dir>>(`${this.baseUrl}/communication-type/page`, { params });
  }

  /**
   * Обновление
   * @param data: Dir
   * @returns Observable<Dir>
   */
  public update(data: Dir): Observable<Dir> {
    return this.http.post<Dir>(`${this.baseUrl}/communication-type/update`, {
      ...data
    });
  }

  /**
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/communication-type/upload`, params);
  }
}
