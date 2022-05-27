import { PageDTO, PaginationAndSortingDto, ProductRes, ProductResDto, TransformQueryParams } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

// TODO исправить any
@Injectable({ providedIn: 'root' })
export class ProductCategoryControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение только активных записей справочника кредитного продукта
   * @returns Observable<ProductRes[]>
   */
  public getAllActive(): Observable<ProductRes[]> {
    return this.http.get<ProductRes[]>(this.path + `/products`);
  }

  /**
   * Получение всех записей справочника кредитного продукта
   * @returns Observable<ProductRes[]>
   */
  public getAll(): Observable<ProductRes[]> {
    return this.http.get<ProductRes[]>(this.path + `/products/admin`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<ProductDto>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<ProductRes>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ProductRes>>(this.path + `/products/page`, { params });
  }

  /**
   * Создание справочника кредитного продукта
   * @param data: any
   * @returns Observable<ProductDto>
   */
  public create(data: ProductResDto): Observable<ProductResDto> {
    return this.http.post<ProductResDto>(this.path + `/products`, { ...data });
  }

  /**
   * Обновление справочника кредитного продукта
   * @param data: any
   * @returns Observable<ProductDto>
   */
  public update(data: ProductResDto): Observable<ProductResDto> {
    return this.http.post<ProductResDto>(`${this.path}/products/update`, data);
  }

  /**
   * получение справочника кредитного продукта по id
   * @param id: number
   * @returns Observable<ProductDto>
   */
  public getById(id: number): Observable<ProductRes> {
    return this.http.get<ProductRes>(this.path + `/products/${id}`);
  }

  /**
   * деактивация/активация справочника кредитного продукта по id
   * @param id: number
   * @returns Observable<any>
   */
  public deactivate(id: number): Observable<any> {
    return this.http.get<any>(this.path + `/products/deactivate/${id}`);
  }
}
