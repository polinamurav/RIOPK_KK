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
  DirSigner,
  DirSignerDto
} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DirSignerControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение полного списка данных
   * @returns Observable of DirSigner
   */
  public getList(): Observable<DirSigner[]> {
    return this.http.get<DirSigner[]>(`${this.baseUrl}/signer`);
  }

  /**
   * Добавление файла
   * @param data Файл и информация о нём
   * @returns Observable of DirSignerDto
   */
  public create(data: DirSignerDto): Observable<DirSignerDto> {
    return this.http.post<DirSignerDto>(`${this.baseUrl}/signer`, data);
  }

  /**
   * получение справочника по id
   * @param id: number
   * @returns Observable of DirSigner
   */
  public getById(id: number): Observable<DirSigner> {
    return this.http.get<DirSigner>(`${this.baseUrl}/signer/${id}`);
  }

  /**
   * деактивация справочника по id
   * @param id: number
   * @returns Observable<ResponseEntity>
   */
  public deactivate(id: number): Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.baseUrl}/signer/deactivate/${id}`);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/signer/download`, { responseType: 'blob' });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirSigner>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirSigner>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirSigner>>(`${this.baseUrl}/signer/page`, { params });
  }

  /**
   * Обновление
   * @param data: DirSignerDto
   * @returns Observable<DirSignerDto>
   */
  public update(data: DirSignerDto): Observable<DirSignerDto> {
    return this.http.post<DirSignerDto>(`${this.baseUrl}/signer/update`, {
      ...data
    });
  }

  /**
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/signer/upload`, params);
  }
}
