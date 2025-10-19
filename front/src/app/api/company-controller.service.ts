import {
  Company,
  CompanyDto,
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
  transformOptions,
  TransformQueryParams,
  UploadOptions
} from '@app/_models';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { DirCorpCompanyDto, DirParamsDto } from '@app/_models/api-models/dir-corp-company-dto';

@Injectable({
  providedIn: 'root'
})
export class CompanyControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка компаний
   * @returns Observable<Company[]>
   */
  public getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl + `/company`);
  }

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Company>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Company>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Company>>(`${this.baseUrl}/company/page`, { params });
  }

  /**
   * Создание компании
   * @param company: компания
   * @returns Observable<number>
   */
  public create(company: CompanyDto | Partial<CompanyDto>): Observable<number> {
    return this.http.post<number>(this.baseUrl + `/company`, company);
  }

  /**
   * Сохранение
   * @param param Параметры для POST запроса
   * @returns Observable of Company
   */
  public update(company: CompanyDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/company/update`, company);
  }

  // corp-company
  public getCorpCompany(): Observable<DirCorpCompanyDto[]> {
    return this.http.get<DirCorpCompanyDto[]>(`${this.baseUrl}/corp-company`);
  }

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Company>
   */
  public getCorpCompanyByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirCorpCompanyDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirCorpCompanyDto>>(`${this.baseUrl}/corp-company/page`, { params });
  }

  public getCorpCompanyByInn(inn: string): Observable<DirCorpCompanyDto[]> {
    return this.http.get<DirCorpCompanyDto[]>(`${this.baseUrl}/corp-company/${inn}`);
  }

  // search corp-company/dir_corp_company
  public searchCorpCompany(params?: DirParamsDto): Observable<DirCorpCompanyDto[]> {
    return this.http.post<DirCorpCompanyDto[]>(`${this.baseUrl}/corp-company/dir_corp_company`, params);
  }

  public downloadCorpCompany(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/corp-company/download`, { responseType: 'blob', observe: 'response' });
  }

  public uploadCorpCompany(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/corp-company/upload`, params);
  }

  public updateCorpCompany(corpCompany: DirCorpCompanyDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/corp-company/update`, corpCompany);
  }
}
