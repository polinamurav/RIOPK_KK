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
  DirAbsCode
} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DirEmploymentLegalStructureControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение справочника организационно-правовой структуры
   * @returns Observable of DirAbsCode
   */
  public getList(): Observable<DirAbsCode[]> {
    return this.http.get<DirAbsCode[]>(`${this.baseUrl}/employment-legal-structure-type`);
  }

  /**
   * Добавление файла
   * @param data Файл и информация о нём
   * @returns Observable of <DirEmploymentLegalStructureTypeDto>
   */
  public create(data: DirAbsCode): Observable<DirAbsCode> {
    return this.http.post<DirAbsCode>(`${this.baseUrl}/employment-legal-structure-type`, data);
  }

  /**
   * получение справочника по id
   * @param id: number
   * @returns Observable of <DirAbsCode>
   */
  public getById(id: number): Observable<DirAbsCode> {
    return this.http.get<DirAbsCode>(`${this.baseUrl}/employment-legal-structure-type/${id}`);
  }

  /**
   * деактивация/активация справочника по id
   * @param id: number
   * @returns Observable<ResponseEntity>
   */
  public deactivate(id: number): Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.baseUrl}/employment-legal-structure-type/deactivate/${id}`);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/employment-legal-structure-type/download`, { responseType: 'blob' });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirAbsCode>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirAbsCode>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirAbsCode>>(`${this.baseUrl}/employment-legal-structure-type/page`, { params });
  }

  /**
   * Обновление
   * @param data: DirAbsCode
   * @returns Observable<DirAbsCode>
   */
  public update(data: DirAbsCode): Observable<DirAbsCode> {
    return this.http.post<DirAbsCode>(`${this.baseUrl}/employment-legal-structure-type/update`, {
      ...data
    });
  }

  /**
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/employment-legal-structure-type/upload`, params);
  }
}
