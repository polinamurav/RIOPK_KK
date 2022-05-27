import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import {
  PaginationAndSortingDto,
  PageDTO,
  InsuranceCompany,
  TransformQueryParams,
  InsuranceCompanyDto
} from '@app/_models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompanyControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение справочника страховых компаний
   * @returns Observable<ProductDto[]>
   */
  public getAll(): Observable<InsuranceCompany[]> {
    return this.http.get<InsuranceCompany[]>(`${this.baseUrl}/insurance-company`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<InsuranceCompany>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<InsuranceCompany>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<InsuranceCompany>>(`${this.baseUrl}/insurance-company/page`, { params });
  }

  /**
   * Создание страховой компании
   * @returns Observable of PageDTO<InsuranceCompany>
   */
  create(insuranceCompany: InsuranceCompanyDto): Observable<InsuranceCompany> {
    return this.http.post<InsuranceCompany>(`${this.baseUrl}/insurance-company`, insuranceCompany);
  }

  /**
   * Обновление страховой компании
   * @returns Observable of PageDTO<InsuranceCompany>
   */
  update(insuranceCompany: InsuranceCompanyDto): Observable<InsuranceCompany> {
    return this.http.post<InsuranceCompany>(`${this.baseUrl}/insurance-company/update`, insuranceCompany);
  }
}
