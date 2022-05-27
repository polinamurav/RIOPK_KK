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
  Dir
} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TariffControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка тарифов
   * @returns Observable<Segment[]>
   */
  public getList(): Observable<Dir[]> {
    return this.http.get<Dir[]>(this.baseUrl + `/tariff`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Dir>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Dir>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Dir>>(`${this.baseUrl}/tariff/page`, { params });
  }

  /**
   * Скачать справочник
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(this.baseUrl + `/tariff/download`, { responseType: 'blob' });
  }

  /**
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/tariff/upload`, params);
  }
}
