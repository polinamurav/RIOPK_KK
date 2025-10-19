import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  TransformQueryParams,
  PageDTO,
  PaginationAndSortingDto,
  InsuranceCondition,
  InsuranceConditionDto
} from '@app/_models';
import { Injectable } from '@angular/core';

// TODO исправить any
@Injectable({ providedIn: 'root' })
export class InsuranceConditionControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение справочника параметров страхования
   * @returns Observable<InsuranceCondition[]>
   */
  public getAll(): Observable<InsuranceCondition[]> {
    return this.http.get<InsuranceCondition[]>(`${this.baseUrl}/insurance-condition`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<InsuranceCondition>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<InsuranceCondition>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<InsuranceCondition>>(`${this.baseUrl}/insurance-condition/page`, { params });
  }

  /**
   * Создание справочника параметров страхования
   * @param data: any
   * @returns Observable<InsuranceConditionDto>
   */
  public create(data: InsuranceConditionDto): Observable<InsuranceConditionDto> {
    return this.http.post<InsuranceConditionDto>(`${this.baseUrl}/insurance-condition`, { ...data });
  }

  /**
   * получение справочника параметров страхования по id
   * @param id: number
   * @returns Observable<InsuranceCondition>
   */
  public getById(id: number): Observable<InsuranceCondition> {
    return this.http.get<InsuranceCondition>(`${this.baseUrl}/insurance-condition/${id}`);
  }

  /**
   * деактивация/активация параметров страхования продукта по id
   * @param id: number
   * @returns Observable<any>
   */
  public deactivate(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/insurance-condition/deactivate/${id}`);
  }

  /**
   * Обновление страховой компании
   * @returns Observable of PageDTO<InsuranceCompany>
   */
  update(insuranceCompany: InsuranceConditionDto): Observable<InsuranceCondition> {
    return this.http.post<InsuranceCondition>(`${this.baseUrl}/insurance-condition/update`, insuranceCompany);
  }
}
