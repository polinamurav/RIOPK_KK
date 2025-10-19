import {
  PageDTO,
  PaginationAndSortingDto,
  ProductDiscountCondition,
  ProductDiscountConditionDto,
  TransformQueryParams
} from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductDiscountConditionControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение акций
   * @returns Observable<ProductDiscountCondition[]>
   */
  public getAll(): Observable<ProductDiscountCondition[]> {
    return this.http.get<ProductDiscountCondition[]>(this.baseUrl + `/product-discount`);
  }

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<ProductDiscountCondition>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<ProductDiscountCondition>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ProductDiscountCondition>>(`${this.baseUrl}/product-discount/page`, { params });
  }

  /**
   * Создание акции
   * @returns Observable of number
   */
  create(productDiscountCondition: ProductDiscountConditionDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/product-discount`, productDiscountCondition);
  }

  /**
   * Обновление акции
   * @returns Observable of number
   */
  update(productDiscountCondition: ProductDiscountConditionDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/product-discount/update`, productDiscountCondition);
  }
}
