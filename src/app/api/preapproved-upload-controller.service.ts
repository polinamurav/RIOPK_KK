import {
  PageDTO,
  PaginationAndSortingDto,
  PreapprovedUpload,
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
export class PreapprovedUploadControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение Списка Preapproved-Upload
   * @returns Observable<PreapprovedUpload[]>
   */
  public getList(): Observable<PreapprovedUpload[]> {
    return this.http.get<PreapprovedUpload[]>(this.baseUrl + `/preapproved-upload`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<PreapprovedUpload>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<PreapprovedUpload>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<PreapprovedUpload>>(`${this.baseUrl}/preapproved-upload/page`, { params });
  }

  /**
   * Скачать Preapproved-Upload
   * @returns Observable<Blob>
   */
  public download(uploadId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/preapproved-upload/download/${uploadId}`, { responseType: 'blob' });
  }

  /**
   * Загрузить файл
   * @param file - файл запакованный в FormData
   */
  public upload(options: UploadOptions) {
    const params = transformOptions(options);

    return this.http.post<ResponseEntity>(`${this.baseUrl}/preapproved-upload/upload`, params);
  }
}
