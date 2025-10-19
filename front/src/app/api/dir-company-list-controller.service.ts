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
  DirCompanyList,
  DirCompanyListDto
} from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DirCompanyListControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @returns Observable of DirCompanyList
   */
  public getList(): Observable<DirCompanyList[]> {
    return this.http.get<DirCompanyList[]>(`${this.baseUrl}/company-list`);
  }

  /**
   * Создание
   * @param data: DirCompanyListDto
   * @returns Observable<DirCompanyListDto>
   */
  public create(dto: DirCompanyListDto): Observable<DirCompanyListDto> {
    return this.http.post<DirCompanyListDto>(`${this.baseUrl}/company-list`, { ...dto });
  }

  /**
   * получение справочника по id
   * @param id: number
   * @returns Observable<DirCompanyListDto>
   */
  public getById(id: number): Observable<DirCompanyListDto> {
    return this.http.get<DirCompanyListDto>(`${this.baseUrl}/company-list/${id}`);
  }

  /**
   * Деактивация
   * @param id: number
   * @returns Observable<any>
   */
  public deactivate(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/company-list/${id}`, {});
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/company-list/download`, { responseType: 'blob' });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirCompanyList>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirCompanyList>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirCompanyList>>(`${this.baseUrl}/company-list/page`, { params });
  }

  /**
   * Сохранение
   * @param param Параметры для POST запроса
   * @returns Observable of DirCompanyListDto
   */
  public update(appDto: DirCompanyListDto): Observable<DirCompanyListDto> {
    return this.http.post<DirCompanyListDto>(`${this.baseUrl}/company-list/update`, appDto);
  }

  /**
   * Обновление
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/company-list/upload`, params);
  }
}
