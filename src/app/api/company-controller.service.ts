import { Company, CompanyDto, PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

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
}
