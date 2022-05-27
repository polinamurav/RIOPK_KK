import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  PageDTO,
  PaginationAndSortingDto,
  TransformQueryParams,
  UploadOptions,
  ResponseEntity,
  transformOptions,
  DirPreApproved
} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DirPreApprovedCreditControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Directory>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirPreApproved>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirPreApproved>>(`${this.baseUrl}/pre-approved/page`, { params });
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pre-approved/download`, { responseType: 'blob' });
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const file = transformOptions({ file: options.file });
    return this.http.post<ResponseEntity>(`${this.baseUrl}/pre-approved/upload`, file);
  }
}
