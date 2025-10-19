import { PageDTO, PaginationAndSortingDto, ProductDto, ProductResDto, TransformQueryParams } from '@app/_models';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { DirScheduleFrequency } from '@app/_models/api-models/DirScheduleFrequency';

// TODO исправить any
@Injectable({ providedIn: 'root' })
export class ProductCategoryControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение только активных записей справочника кредитного продукта
   * @returns Observable<ProductDto[]>
   */
  public getAllActive(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.path + `/products`);
  }

  /**
   * Получение всех записей справочника кредитного продукта
   * @returns Observable<ProductDto[]>
   */
  public getAll(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.path + `/products/admin`);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<ProductDto>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<ProductDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ProductDto>>(this.path + `/products/page`, { params });
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
  public getById(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(this.path + `/products/${id}`);
  }

  /**
   * деактивация/активация справочника кредитного продукта по id
   * @param id: number
   * @returns Observable<any>
   */
  public deactivate(id: number): Observable<any> {
    return this.http.get<any>(this.path + `/products/deactivate/${id}`);
  }

  /**
   *
   * Получение справочника периодичности платежей для продукта
   * @param id: number
   * @returns Observable<ProductDto>
   */
  public getProductsFrequencyById(id: number): Observable<DirScheduleFrequency[]> {
    return this.http.get<DirScheduleFrequency[]>(this.path + `/products/frequency/${id}`);
  }

  public getPosProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.path + `/products/pos`);
  }
}
