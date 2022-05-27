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

export class DirCommonService<T> {
  public baseUrl = environment.baseUrl;

  constructor(public path: string, public http: HttpClient) {}

  public getList(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.path}`);
  }

  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<T>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<T>>(`${this.baseUrl}/${this.path}/page`, {
      params
    });
  }

  /**
   * Создание списка
   * @returns Observable of number
   */
  create(item: T): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/${this.path}`, item);
  }

  /**
   * Обновление списка
   * @returns Observable of number
   */
  update(item: T): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/${this.path}/update`, item);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${this.path}/download`, { responseType: 'blob' });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/${this.path}/upload`, params);
  }
}
