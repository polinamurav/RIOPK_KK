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
  DirCountry
} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DirCountryControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @returns Observable of DirCountry
   */
  public getList(): Observable<DirCountry[]> {
    return this.http.get<DirCountry[]>(`${this.baseUrl}/countries`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirCountry>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirCountry>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirCountry>>(`${this.baseUrl}/countries/page`, { params });
  }

  /**
   * Скачивание
   * @returns Observable of ByteArrayResource
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/countries/download`, { responseType: 'blob' });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/countries/upload`, params);
  }
}
